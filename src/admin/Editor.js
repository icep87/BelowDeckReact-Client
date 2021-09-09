import React, {useState, useEffect} from 'react';
import Dante from 'dante3';
import { convertFromRaw,  convertFromHTML, ContentState} from "draft-js";

const Editor = (props) => {

  const [content, setContent] = useState();

  useEffect(() => {
    setContent(props.content)
  }, [props.content])
  
  if(content) {
    const blocksFromHTML = convertFromHTML(content);
    console.log(blocksFromHTML);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
  }


  return (
    <div>
      <textarea
        id="content"
        name="content"
        rows={10}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
        defaultValue={content} onChange={props.onChangeHandler}
      />
      {/* <Dante onChange={() => { console.log('This should log') }}/> */}
    </div>
  )
}

export default Editor;