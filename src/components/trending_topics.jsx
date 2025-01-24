import React from 'react'
import { Card, Tabs, Tab } from 'react-bootstrap'
import { Twitter, Instagram } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa'
import { trending_twitter, trending_google, trending_instagram } from '../data/trending'

const Trending_topics = () => {
 return (
   <Card 
     style={{
       padding: '1.5rem',
       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
       height: '100%'
     }}
   >
     <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Trending Topics</h2>
     <Tabs defaultActiveKey="twitter">
       <Tab 
         eventKey="twitter" 
         title={
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Twitter size={18} style={{ color: '#1DA1F2' }} />
             <span>Twitter</span>
           </div>
         }
       >
         {trending_twitter.map((trend) => (
           <div key={trend.rank} style={{
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center',
             padding: '0.75rem 1rem',
             borderBottom: '1px solid #dee2e6',
             transition: 'background-color 0.2s',
             cursor: 'pointer',
             ':hover': {
               backgroundColor: '#f8f9fa'
             }
           }}>
             <div style={{ display: 'flex', gap: '1rem' }}>
               <span style={{ color: '#6c757d', fontWeight: 500, minWidth: '24px' }}>#{trend.rank}</span>
               <span style={{ fontWeight: 500 }}>{trend.topic}</span>
             </div>
             <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>{trend.tweets}</span>
           </div>
         ))}
       </Tab>
       
       <Tab 
         eventKey="google" 
         title={
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <FaGoogle size={18} style={{ color: '#DB4437' }} />
             <span>Google</span>
           </div>
         }
       >
         {trending_google.map((trend) => (
           <div key={trend.rank} style={{
             display: 'flex',
             justifyContent: 'space-between', 
             alignItems: 'center',
             padding: '0.75rem 1rem',
             borderBottom: '1px solid #dee2e6',
             transition: 'background-color 0.2s',
             cursor: 'pointer'
           }}>
             <div style={{ display: 'flex', gap: '1rem' }}>
               <span style={{ color: '#6c757d', fontWeight: 500, minWidth: '24px' }}>#{trend.rank}</span>
               <span style={{ fontWeight: 500 }}>{trend.topic}</span>
             </div>
             <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>{trend.searches}</span>
           </div>
         ))}
       </Tab>
       
       <Tab 
         eventKey="instagram" 
         title={
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Instagram size={18} style={{ color: '#E1306C' }} />
             <span>Instagram</span>
           </div>
         }
       >
         {trending_instagram.map((trend) => (
           <div key={trend.rank} style={{
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center', 
             padding: '0.75rem 1rem',
             borderBottom: '1px solid #dee2e6',
             transition: 'background-color 0.2s',
             cursor: 'pointer'
           }}>
             <div style={{ display: 'flex', gap: '1rem' }}>
               <span style={{ color: '#6c757d', fontWeight: 500, minWidth: '24px' }}>#{trend.rank}</span>
               <span style={{ fontWeight: 500 }}>{trend.topic}</span>
             </div>
             <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>{trend.posts}</span>
           </div>
         ))}
       </Tab>
     </Tabs>
   </Card>
 )
}

export default Trending_topics