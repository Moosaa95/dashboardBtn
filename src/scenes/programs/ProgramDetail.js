import React from 'react'

export const ProgramDetail = ({programDetail}) => {
  return  (
    <>
        <h2>
            {programDetail.program_name}
        </h2>
        <h2>
            {programDetail.program_description}
        </h2>
    </>
  )
}
