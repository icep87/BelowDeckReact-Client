import React, { useEffect, useState } from 'react';
import BelowDeckApi from '../services/BelowDeckApi'

const posts = [
    {
        title: 'Boost your conversion rate',
        href: '#',
        category: { name: 'Article', href: '#', color: 'bg-indigo-100 text-indigo-800' },
        description:
            'Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        author: {
            name: 'Paul York',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        readingTime: '6 min',
    },
    {
        title: 'How to use search engine optimization to drive sales',
        href: '#',
        category: { name: 'Video', href: '#', color: 'bg-pink-100 text-pink-800' },
        description:
            'Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.',
        date: 'Mar 10, 2020',
        datetime: '2020-03-10',
        author: {
            name: 'Dessie Ryan',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        readingTime: '4 min',
    },
    {
        title: 'Improve your customer experience',
        href: '#',
        category: { name: 'Case Study', href: '#', color: 'bg-green-100 text-green-800' },
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iure iusto fugiat commodi sequi.',
        date: 'Feb 12, 2020',
        datetime: '2020-02-12',
        author: {
            name: 'Easer Collins',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        readingTime: '11 min',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const RecentPublications = () => {

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
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
            <div>
                <h2 className="text-lx tracking-tight font-bold text-gray-900 sm:text-4xl">Recent publications</h2>
                <p className="mt-3 text-lg text-gray-500 sm:mt-4">
                    Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
                    arcu.
                </p>
            </div>
            <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                {posts.slice(0,3).map((post) => (
                    <div key={post.title}>
                        <div>
                            <a href="#" className="inline-block">
                                <span
                                    className='bg-pink-100 text-pink-800
                                        inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                                >
                                    {post.category.name}
                                </span>
                            </a>
                        </div>
                        <a href={`/posts/${post.uri}`}className="block mt-4">
                            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                            <p className="mt-3 text-base text-gray-500 truncate h-10">{post.content.replace(/(<([^>]+)>)/g, "")}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
                     
    )
}

export default RecentPublications;