import * as React from 'react';
import { Alert, Button, FormGroup, Input } from 'reactstrap';
import { apiFetch } from '../../api-fetch';
import majorInstances from '../../major-instances';
import { Title } from '../common/title';

interface State {
    loading: boolean;
	defaultInstance: string;
}

export class PageLogin extends React.Component<{}, State> 
{
	constructor(props: {}) 
	{
		super(props);
		this.state = {
			loading: false,
			defaultInstance: 'planet.moe'
		};
	}

	render() 
	{
		const { loading, defaultInstance } = this.state;
		return <div>
			<Title>로그인</Title>
			<h1>로그인</h1>
			<p>사용중인 Mastodon 계정이 있는 인스턴스를 입력해 주세요.</p>
			<form action="javascript://" onSubmit={this.send.bind(this)}>
				<FormGroup>
					<Input name="instance" placeholder={defaultInstance} list="major-instances"/>
					<datalist id="major-instances">
						{majorInstances.map((instance) => <option value={instance} />)}
					</datalist>
				</FormGroup>
				<Button type="submit" color="primary" disabled={loading}>{ loading ? '불러오는 중' : '로그인' }</Button>
			</form>
		</div>;
	}

	send(e: any) 
	{
		const form = new FormData(e.target);
		this.callApi(form);
	}
	async callApi(form: FormData) 
	{
		this.setState({
			loading: true
		});
		function errorMsg(code: number | string) 
		{
			return '로그인에 실패했어요. 입력한 내용을 확인하신 후 다시 시도해 주세요. (' + code + ')';
		}
		const req = await apiFetch('/api/web/oauth/get_url', {
			method: 'POST',
			body: form
		}).catch((e) => 
		{
			alert(errorMsg(-1));
			this.setState({
				loading: false
			});
		});
		if (!req) return;
		if (!req.ok) 
		{
			alert(errorMsg('HTTP-' + req.status));
			this.setState({
				loading: false
			});
			return;
		}
		const urlRes = await req.json().catch((e) => 
		{
			alert(errorMsg(-2));
			this.setState({
				loading: false
			});
		});
		if (!urlRes) return;
		location.href = urlRes.url;
	}
}
