import React, {useState, useEffect} from 'react';
import RecentPublications from '../RecentPublications'
//We will need to properly sanitize the content string if it contains some property values
//But as they should not contain it, this should not be a problem.
const ArticlePage = (props) => {
    console.log("ArticlePage");
    console.log(props);

    const [content, setContent] = useState(props.data);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setContent(props.data);
        setIsLoading(false)
    },[]);

    if (isLoading) return <div>Loading content</div>    
    return (
        <>
            <div className="relative bg-white overflow-hidden pb-20 pt-10">
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <div className="text-lg max-w-prose mx-auto">
                        <h1>
                        <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                            {content.category.name}
                            </span>
                            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {content.title}
                            </span>
                        </h1>
                        <div className="mt-10 prose prose-indigo prose-lg text-gray-500 mx-auto max-w-none" dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
                    </div>
                </div>
            </div>
            <RecentPublications />
        </>
    );
}

export default ArticlePage;
