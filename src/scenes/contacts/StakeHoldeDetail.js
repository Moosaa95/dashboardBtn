import React from 'react'
import {Link, useParams} from "react-router-dom"

export const StakeHoldeDetail = () => {

    const { stakeholderId } = useParams();

    console.log('stake view page', stakeholderId);

  return (
    <div>

      
    </div>
  )
}
