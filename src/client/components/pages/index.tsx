import * as React from 'react';
import { Link } from 'react-router-dom';
import { me } from '../../initial-state';
import { PageLatest } from './latest';
import {Helmet} from "react-helmet";

export class PageIndex extends React.Component 
{
	render() 
	{
		return <div>
			<h1>Quesdon@Planet</h1>
			<p>Mastodon에서 사용할 수 있는 askfm스러운 무언가</p>
			<p>{me ? <Link to="/my">마이페이지</Link> : <Link to="/login">로그인</Link>}</p>
			<PageLatest />
			<Helmet>
				<title>Quesdon@Planet</title>
			</Helmet>
		</div>;
	}
}
