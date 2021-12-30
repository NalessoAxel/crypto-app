import { Navbar, Footer, Welcome, Services, Transactions } from './components'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>

      <div className="gradient-bg-services">
      <Services />
      </div>

      <div className="gradient-bg-transactions">
      <Transactions />
      </div>
      
      <div className='gradient-bg-footer'>
      <Footer />
      </div>
    </div>
  )
}

export default App
