import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://min-journey-dall-e.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a valid prompt')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('https://min-journey-dall-e.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...form}),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image!')
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className='max-w-7xl mx-auto'>
    {/* Heading and Subtitle */}
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create AI Images 
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
          Explore to test out your very own DALL-E OpenAI generated images! Share your creativity with the community!
        </p>
      </div>
    {/* Name and Prompt FormFields */}
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            labelName='Your Name'
            type='text'
            name='name'
            placeholder='Aung San Suu Kyi'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='a surrealist dream-like oil painting by Salvador Dalí of a cat playing chess with Van Gogh in a starry night'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        {/* AI Image */}
          <div className='relative bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-xl p-3 h-xl flex justify-center items-center'>
            {form.photo ? (
              <img 
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img 
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
            
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
      {/* Submit Button */}
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-125 transition duration-500 ease-in-out'
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
      {/* Share Button */}
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Feel free to share your AI generated image with the community! 
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-125 transition duration-500 ease-in-out'
          >
            {loading ? 'Sharing...' : 'Share to Community!'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost