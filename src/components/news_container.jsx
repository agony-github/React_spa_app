import React, {Component} from 'react'
import {Link} from 'react-router'
export default class NewsContainer extends Component{
    render(){
        return (
            <div>
                <p> <Link to={`/detail/${2}`}>新闻11</Link> </p>
                <p> <Link to={`/detail/${3}`}>新闻222</Link> </p>
                <p><Link to='usercenter'>个人中心</Link></p>
                news_container.....
            </div>
        )
    }
}