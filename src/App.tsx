import  { AllRoomsPage } from "./pages/AllRoomsPage"
import  { SummaryPage } from "./pages/SummaryPage"
import { Routes, Route } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import  { RoomsProvider } from "./context/RoomsContext"

const App = () => {
	return (
	<RoomsProvider>
	<NavBar/>
	<Routes>
		<Route path="/" element={<AllRoomsPage/>}/>
		<Route path="/summary" element={<SummaryPage/>}/>
	</Routes>
	</RoomsProvider>
	)
}

export default App;
