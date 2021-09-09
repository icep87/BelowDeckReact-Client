import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import BelowDeckApi from '../../services/BelowDeckApi'
import { ClientContext } from '../../contexts/ClientContext'

const PostList = () => {

    const [postList, setPostList] = useState([]);
    const { token } = useContext(ClientContext);

    useEffect(() => {
        BelowDeckApi.getPosts().then(data => {
            console.log(data)
            setPostList(data)
        });
    }, [])

    const deletePost = (id) => {
        console.log("DeletePost " + id)
        
        BelowDeckApi.deletePost(id, token).then(data => {
            setPostList(postList.filter(post => post.id !== id));
        });
    }
    return (
        <div className="hidden mt-8 sm:block">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <div className="pl-4 mb-4">
                    <h3 className="text-3xl leading-6 font-medium text-gray-900">Posts</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Here you will find all the posts
                    </p>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="border-t border-gray-200">
                            <th className="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span className="sr-only">Status</span>
                            </th>
                            <th className="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>Title</span>
                            </th>
                            <th className="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>Path</span>
                            </th>
                            <th className="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>Category</span>
                            </th>
                            <th className="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>Type</span>
                            </th>
                            <th className="px-3 py-2 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                
                                <a href='/admin/posts/new/' className="hover:text-gray-900">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-2.5 py-1.5 mr-3 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        New
                                    </button>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {postList.map((post, postIdx) => (
                            <tr key={post.id}>
                                <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                                    <div className="flex items-center space-x-3 lg:pl-2">
                                        <div
                                            className={`${(post.status) ? 'bg-green-600' : 'bg-red-600'} flex-shrink-0 w-2.5 h-2.5 rounded-full`}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {post.title}
                                </td>
                                <td className="hidden md:table-cell px-6 py-3 whitespace-wrap text-sm text-gray-500 text-left">
                                    {post.uri}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                                    {post.category.name}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                                    {post.postType.name}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-500 font-medium text-right">
                                    <a href={'/admin/posts/update/' + post.id} className="hover:text-gray-900">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Edit
                                        </button>
                                    </a>
                                    <button
                                            type="button"
                                            className="inline-flex items-center ml-2 px-2.5 py-1.5  text-xs font-medium rounded text-white bg-red-600 hover:bg-white hover:text-red-600 border hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={deletePost.bind(this, post.id)}
                                        >
                                            Delete
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
};

export default PostList;