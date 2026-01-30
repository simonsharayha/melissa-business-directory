import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { BusinessDetails } from './pages/BusinessDetails'
import { AddBusiness } from './pages/AddBusiness'
import { Directory } from './pages/Directory'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { BusinessProvider } from './context/BusinessContext'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminOverview } from './pages/admin/AdminOverview'
import { AdminListings } from './pages/admin/AdminListings'
import { AdminSettings } from './pages/admin/AdminSettings'
import { EditBusiness } from './pages/admin/EditBusiness'
import { WebsiteServices } from './pages/WebsiteServices'

function App() {
  return (
    <BusinessProvider>
      <Router>
        <Routes>
          {/* Public Routes wrapped in Layout for transitions */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/business/:id" element={<BusinessDetails />} />
            <Route path="/add" element={<AddBusiness />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/website-services" element={<WebsiteServices />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="edit/:id" element={<EditBusiness />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </BusinessProvider>
  )
}

export default App
