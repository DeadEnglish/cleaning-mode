import { invoke } from "@tauri-apps/api/tauri";
import styled from "styled-components";
import icon from "./assets/svg/bubbles.svg";

function App() {
	// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
	async function greet() {
		console.log(await invoke("greet", { name: "liam" }));
	}

	return (
		<Main>
			<div id="background" />
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
				<p>Hold down ⌘ + ⏎ to exit.</p>
			</Content>

			{/* <button onClick={greet}>greet</button> */}
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

	background-image: linear-gradient(
		0deg,
		hsl(0deg 0% 0%) 0%,
		hsl(278deg 38% 11%) 10%,
		hsl(277deg 48% 20%) 20%,
		hsl(277deg 54% 29%) 30%,
		hsl(277deg 58% 39%) 40%,
		hsl(277deg 61% 48%) 50%,
		hsl(277deg 58% 39%) 60%,
		hsl(277deg 54% 29%) 70%,
		hsl(277deg 48% 20%) 80%,
		hsl(278deg 38% 11%) 90%,
		hsl(0deg 0% 0%) 100%
	);
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
