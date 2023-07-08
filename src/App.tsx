import { invoke } from "@tauri-apps/api/tauri";
import styled from "styled-components";
import icon from "./assets/svg/bubbles.svg";
import { Bubbles } from "./Components/bubbles/bubbles.component";

function App() {
	return (
		<Main>
			<Bubbles />
			<Content>
				<Header>
					<Icon size={112}>
						<img
							src={icon}
							alt="App Image"
							width="100%"
							height="100%"
						/>
					</Icon>
					<h1>Cleaning Mode</h1>
				</Header>

				<p>
					Keyboard and mice/trackpads are disabled in cleaning mode.
				</p>
				<p>Press ⌘ + Q to exit.</p>
			</Content>
		</Main>
	);
}

export default App;

const Main = styled.main`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Icon = styled.div<{ size: number }>`
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
	margin: 0 auto 16px;
	display: flex;
	justify-content: center;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	margin: 0 0 144px;

	h1 {
		font-size: 48px;
	}
`;
