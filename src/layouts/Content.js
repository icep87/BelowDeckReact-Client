import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import Page from './Content/Page';
import ArticlePage from './Content/Article';
import { ClientContext} from '../contexts/ClientContext';
import BelowDeckApi from '../services/BelowDeckApi'

const Content = () => {

    let uriParams = useParams();

    const [content, setContent] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(ClientContext);

    useEffect(() => {
        console.log("Loading useEffect");
        console.log("URIParams: " + uriParams.postId);
        setIsLoading(true);

        const data = uriParams.postId;

        if ( data === undefined) {
            console.log("Loading data by SiteData in the future as path is undefined, means /");
            BelowDeckApi.getPosts(context.siteData.homepage).then(article => {
                setContent(article)
                console.log(article);
                setIsLoading(false);
            })
        } else if (isNaN(data)) {
            console.log("Loading data by Path");
            BelowDeckApi.getPostByPath(data).then(article => {
                setContent(article)
                console.log(article);
                setIsLoading(false);
            })
        } else {
            console.log("Loading data by ID");
            BelowDeckApi.getPostByPath(data).then(article => {
                setContent(article);
                console.log(article);
                setIsLoading(false);
            })
        }

    }, []);

    if (isLoading) return <div>Loading content</div>
    if (content.postTypeId === 1) return <Page data={content} />;
    return <ArticlePage data={content} />;

}

export default Content