import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Projects, ProjectsDetails } from "./pages"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

export const App = () => {

    const client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache()
    })

    return (
      <ApolloProvider client={client}>
          <BrowserRouter>
             <div className="container m-auto h-screen flex items-center justify-center">
                <Routes>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectsDetails />}/>
                    <Route path="/*" element={<Navigate to="/projects" />} />
                </Routes>
             </div>
          </BrowserRouter>
      </ApolloProvider>
    )
}
