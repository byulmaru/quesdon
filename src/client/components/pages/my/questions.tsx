import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { APIQuestion, APIUser } from '../../../../api-interfaces';
import { apiFetch } from '../../../api-fetch';
import josa from '../../../../common/josa';
import { Title } from '../../common/title';
import { Loading } from '../../loading';
import { Question } from '../../question';

interface State {
    questions: APIQuestion[];
    loading: boolean;
    loadFailed?: number;
}
export class PageMyQuestions extends React.Component<{}, State> 
{
	constructor(props: {}) 
	{
		super(props);
		this.state = {
			questions: [],
			loading: true
		};
	}
	render() 
	{
		const {
			loading,
			loadFailed,
			questions
		} = this.state;
		return <div>
			<Title>질문 목록 - 마이페이지</Title>
			<h1>아직 답변하지 않은 질문 목록</h1>
			<Link to="/my">마이페이지로 돌아가기</Link>
			<div className="mt-3">
				{loading
					? <Loading/>
					: loadFailed
						?   <span>
                            불러오기에 실패했어요.({ loadFailed < 0 ? loadFailed : 'HTTP-' + loadFailed })。
							<a href="javascript://" onClick={this.load.bind(this)}>새로고침</a>
						</span>
						: questions.map((q) => <Question {...q} hideAnswerUser key={q._id}/>)
				}
			</div>
			<Button href={this.getShareUrl()} color="secondary" target="_blank">
                Mastodon에 질문상자 페이지를 공유
				<wbr />
                (새 창으로 열릴 거에요)
			</Button>
		</div>;
	}

	componentDidMount() 
	{
		this.load();
	}

	async load() 
	{
		this.setState({
			loading: true,
			loadFailed: undefined
		});
		const req = await apiFetch('/api/web/questions').catch((e) => 
		{
			this.setState({
				loading: false,
				loadFailed: -1
			});
			return;
		});
		if (!req) return;
		if (!req.ok) 
		{
			this.setState({
				loading: false,
				loadFailed: req.status
			});
			return;
		}

		const questions = await req.json().catch((e) => 
		{
			this.setState({
				loading: false,
				loadFailed: -2
			});
			return;
		});
		if (!questions) return;
		this.setState({questions, loading: false});
	}
	getShareUrl() 
	{
		const user = (window as any).USER as APIUser;
		const qbox = user.questionBoxName || '질문 상자';
		const text = `저의 ${josa(qbox, '이에요', '예요')}! #quesdon ${location.origin}/@${user.acct}`;
		return `https://${user.hostName}/${user.isTwitter ? 'intent/tweet' : 'share'}?text=${encodeURIComponent(text)}`;
	}
}
