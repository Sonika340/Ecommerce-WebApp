import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './state-mangement/contextApi'
import { CourseProvider } from "./state-mangement/CourseContextAPI";

createRoot(document.getElementById('root')).render(
  

    <AuthProvider>
    <Toaster position='top-right' />
     <CourseProvider>
       <App />
    </CourseProvider>
    </AuthProvider>
   
 
)
