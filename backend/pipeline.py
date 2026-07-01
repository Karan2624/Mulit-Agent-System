from agents import build_reader_agent , build_search_agent,writer_chain,critic_chain
from rich import print
def run_research_pipeline(topic : str) -> dict :
    state = {}
    print("\n" + "="*50)
    print("step 1 - search agent is working...")
    print("\n" + "="*50)

    search_agent = build_search_agent()
    search_result = search_agent.invoke({
        "messages":[("user",f"Find recent, reliable and detailed information about : {topic}\n")]
    })
    tool_output = search_result["messages"][-2].content
    summary = search_result["messages"][-1].content
    print(tool_output)

    state["search_results"] = (
        f"TOOL OUTPUT:\n{tool_output}\n\n"
        f"SUMMARY:\n{summary}"
    )
    print("\n search result",state['search_results'])

    print("\n" + "="*50)
    print("step 2 - reader agent is scraping top resources...")
    print("\n" + "="*50)

    reader_agent = build_reader_agent()
    reader_result = reader_agent.invoke({
        "messages" : [("user",
                        f"Based on the following search results about '{topic}', "
                        f"pick the most relevant URL and scrape it for deeper content.\n\n"
                        f"Search Results:\n{state['search_results'][:800]}"
                       )]
    })
    state['scraped_content'] = reader_result['messages'][-1].content
    print("\n scraped content: \n",state["scraped_content"])

    print("\n" + "="*50)
    print("step 3 - Writer is drafting a report...")
    print("\n" + "="*50)
    research_combined = (
        f"SEARCH RESULTS : \n {state['search_results']}\n\n"
        f"DETAILED RESULTS : \n {state['scraped_content']}\n\n"
    )
    state["report"]=writer_chain.invoke({
        "topic":topic,
        "research":research_combined
    })
    print("\n Final Report: \n",state['report'])

    print("\n" + "="*50)
    print("step 4 - Critic is reviewing report...")
    print("\n" + "="*50)

    state["feedback"]=critic_chain.invoke({
        "report":state['report']
    })
    print("\n critci report \n",state["feedback"])
    return state

if __name__== "__main__":
    topic  = input("\n Enter a research topic : ")
    run_research_pipeline(topic)
