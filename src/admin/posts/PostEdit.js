import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom"
import { useParams } from 'react-router-dom';
import BelowDeckApi from '../../services/BelowDeckApi';
import CategorySelect from '../components/CategorySelect';
import PostTypeSelect from '../components/PostTypeSelect';
import Editor from '../Editor'
import { ClientContext } from '../../contexts/ClientContext'

const PostEdit = () => {

  let { id } = useParams();
  const history = useHistory();
  const { token } = useContext(ClientContext);
  
  const [postData, setPostData] = useState({});
  useEffect(() => {
    BelowDeckApi.getPosts(id).then(data => {
      console.log("Running useEffect in PostEdit");
      console.log(data)
      setPostData(data)
    });
  }, [])

  const convertToSlug = (string) => {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters in a with b
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w-]+/g, '') // Remove all non-word characters such as spaces or tabs
      .replace(/--+/g, '-') // Replace multiple — with single -
      .replace(/^-+/, '') // Trim — from start of text
      .replace(/-+$/, ''); // Trim — from end of text
  }

  const handleChange = (evt) => {

    if (evt.target.name === 'title') {
      setPostData({
        ...postData, [evt.target.name]: evt.target.value, uri: convertToSlug(evt.target.value)
      })
    } else {
      setPostData({
        ...postData, [evt.target.name]: evt.target.value
      })
      console.log(postData);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    BelowDeckApi.updatePost(postData, token).then(data => {
      console.log(data)
      history.push("/admin/posts");
    });
  }

  return (
    <div className="m-8">
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Post Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Title" onChange={handleChange} value={postData.title} 
              />
            </div>
            <p className="mt-2 text-xs text-gray-500" id="title-uri">
              URL Slug: /{postData.uri}
            </p>
          </div>
          <CategorySelect categoryId={postData.categoryId} onChangeHandler={handleChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={postData.status} onChange={handleChange} defaultValue={postData.status}
            >
              <option id="0" value="0">Draft</option>
              <option id="1" value="1">Published</option>
            </select>
          </div>
          <PostTypeSelect postTypeId={postData.posttypeid} onChangeHandler={handleChange} />
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1">
            <Editor content={postData.content} onChangeHandler={handleChange} />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
};

export default PostEdit;