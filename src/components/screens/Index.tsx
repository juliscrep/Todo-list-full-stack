/* eslint-disable no-unused-vars */

import { addDoc, collection, getDocs, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToolCard from '../shared/ToolCard';

export type Tool = {
  id?: string,
  title?: string,
  description?: string,
  url?: string
}

export enum InputEnum {
  Id = 'id',
  Title = 'title',
  Description = 'description',
  Url = 'url',
}

function Index() {
  const [tools, setTools] = useState<Array<Partial<Tool>>>([]);
  const firestore = useFirestore();
  const [inputData, setInputData] = useState<Partial<Tool>>({
    title:'',
    description: '',
    url: ''
  });
  const [formError, setFormError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const toolsCollection = collection(firestore, "tools");
      const toolsQuery = query(toolsCollection);
      const querySnapshot = await getDocs(toolsQuery);
      const fetchedData: Array<Tool> = [];

      querySnapshot.forEach((doc) => {
        fetchedData.push({id: doc.id, ...doc.data()} as Tool);
      });
      setTools(fetchedData);
    }
    fetchData();
  }, []);

  const onUpdateTool = (id: string, data: Tool) => {
    const docRef = doc(firestore, "tools",id);
    updateDoc(docRef, data)
    .then(docRef => {
      toast.success('🦄 updated the tool successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    })
    .catch(error => {
      console.log(error);
    })
  }

  const onDeleteTool = async (id: string) => {
    try {
      const docRef = doc(firestore, "tools", id);
      await deleteDoc(docRef);
      const updatedTools = tools.filter(tool => tool.id !== id);
      setTools(updatedTools);
      toast.success('🗑️ Deleted the tool successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error('❌ Failed to delete the tool!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  


  const handleInputChange = (field: InputEnum, value: string) => {
    setInputData({ ...inputData, [field]: value})
  }
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const toolsCollection = collection(firestore, "tools");
      
      const newTool: Partial<Tool> = {
        title: inputData.title,
        description: inputData.description,
        url: inputData.url
      } 

      const docRef = await addDoc(toolsCollection, newTool);
      toast.success('🦄 Saved the tool successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      setTools([...tools, {id: docRef.id, ...newTool}]);
      setInputData({
        title:'',
        description: '',
        url: ''
      })

    }catch(error){
      setFormError(true);
    }

  }

  return (
    <>
      <Head />
      <div className="hero min-h-screen bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <form className="flex flex-row items-center justify-center" onSubmit={handleFormSubmit}>
            <input type="text" onChange={(e) => handleInputChange(InputEnum.Title, e.target.value)} value={inputData.title} placeholder="title" className="m-4 text-slate-50 bg-transparent border border-slate-700 focus:ring-slate-400 focus:outline-none p-4 rounded-lg" />
            <input type="text" onChange={(e) => handleInputChange(InputEnum.Description, e.target.value)} value={inputData.description} placeholder="description" className="m-4 text-justify text-slate-50 bg-transparent border border-slate-700 focus:ring-slate-400 focus:outline-none p-4 rounded-lg" />
            <input type="text" onChange={(e) => handleInputChange(InputEnum.Url, e.target.value)} value={inputData.url} placeholder="url" className="m-4 text-slate-50 bg-transparent border border-slate-700 focus:ring-slate-400 focus:outline-none p-4 rounded-lg" />
            <button type="submit" className="m-4 border border-purple-600 p-5 rounded-lg transition-opacity bg-purple-600 hover:bg-opacity-50 text-slate-50">Add new tool</button>
          </form>
          <div className="grid grid-cols-3 gap-4 w-full bg-transparent text-slate-50">
          
              {
                tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onUpdate={onUpdateTool} onDelete={onDeleteTool} />
                ))
              }
            
          </div>
        </div>      
      </div>
      <ToastContainer />     
    </>
  );
}

export default Index;
