import React from 'react'

const Footer = () => {
  return (
    <div className='text-[#737373] md:px-10'>
        <div className='py-15 text-center'>
        <p>Developed By Rando</p>
        <p>Read about NetFlix TV shows and movies and watch bonus videos on Rando.com </p>
        </div>
        <p className='pb-5'>Questions? Contact Us.</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 text-sm pb-10 max-w-5xl'>
            <ul className='flex flex-col space-y-2'>
                <li>FAQ</li>
                <li>Investor Relations</li>
                <li>Privacy</li>
                <li>Speed Test</li>
            </ul>
            <ul className='flex flex-col space-y-2'>
                <li>Help Center</li>
                <li>Jobs</li>
                <li>Cookie Preferences</li>
                <li>Legal Notices</li>
            </ul>
            <ul className='flex flex-col space-y-2'>
                <li>Account</li>
                <li>Ways To Watch</li>
                <li>Corporate Information</li>
                <li>Only on NetFlix</li>
            </ul>
            <ul className='flex flex-col space-y-2'>
                <li>Media Center</li>
                <li>Terms of Use</li>
                <li>Contact Us</li>
            </ul>
        </div>
        <p className='pt-5 text-center'>Made By Pranav Vibhute ©2025</p>
    </div>
  )
}

export default Footer