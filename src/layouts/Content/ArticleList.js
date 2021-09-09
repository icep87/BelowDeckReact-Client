import React, { useEffect, useState } from 'react';
import BelowDeckApi from '../../services/BelowDeckApi'

const ArticleList = () => {

    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Loading useEffect");
        setIsLoading(true);

        BelowDeckApi.getPostsByType("Article").then(post => {
            setPosts(post)
            console.log(post);
            setIsLoading(false);
        });

        }, []);
    
    if (isLoading) return <div>Loading content</div>    
    return (
        <main>
            <div className="relative">
                <div className="h-1/2 bg-white">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white pt-5 pb-20 px-4 sm:px-6 lg:pt-5 lg:pb-28 lg:px-8">
                            <ul className="divide-y">
                                {posts.map((post) => (
                                    <li className=" py-4">
                                        <div key={post.title}>
                                            <p className="text-sm text-gray-500">
                                                <time></time>
                                            </p>
                                            <a href="#" className="mt-2 block">
                                                <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                                <p className="mt-3 text-base text-gray-500 truncate leading-relaxed">{post.content.replace(/(<([^>]+)>)/g, "")}</p>
                                            </a>
                                            <div className="mt-3">
                                                <a href={`/posts/${post.uri}`} className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Read full story
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div >
                    </div>
                </div>
            </div>
        </main>
    )

}

export default ArticleList;