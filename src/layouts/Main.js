import React from 'react'
import RecentPublications from './RecentPublications'
import Content from './Content'

const Main = () => {

    return (
        <main>
            <div className="relative">
                <div className="h-1/2 bg-white">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white pt-5 pb-20 px-4 sm:px-6 lg:pt-5 lg:pb-28 lg:px-8">
                            <Content/>
                        </div >
                    </div>
                </div>
            </div>
        </main>)
}

export default Main;