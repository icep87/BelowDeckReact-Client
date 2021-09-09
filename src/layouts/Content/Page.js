import React from 'react';

//We will need to properly sanitize the content string if it contains some property values
//But as they should not containt is this should not be a problem.
const Page = (props) => {
    return (
        <>
        <div className="relative bg-white overflow-hidden pb-20">
        <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">  
                <div className="mt-10 prose prose-indigo prose-lg text-gray-500 mx-auto max-w-none" dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Page; 
