import React from 'react'
import NewsHeader from './news_header'

export default class App extends React.Component{
    render(){
        return (
            <div>
                <NewsHeader>header...</NewsHeader>
                {this.props.children}
                <div>footer....</div>
            </div>
        )
    }
}