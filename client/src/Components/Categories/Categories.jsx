import React from 'react'
import Container from '../Shared/Container'
import {categories} from "./categoriesData";
import CategoryBox from './CategoryBox';
const Categories = () => {
  return (
    <>
      <Container>
        <div className='pt-4 flex items-center justify-between overflow-x-auto'>
          {categories.map((item,i)=><CategoryBox key={i} item={item}/>)}
        </div>
      </Container>
    </>
  )
}

export default Categories
