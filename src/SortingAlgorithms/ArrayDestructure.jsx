import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tree from 'react-d3-tree';



const ArrayDestructureMain = ({ val }) => {
    const [arr, setarr] = useState();
    const [components, setcomponents] = useState();
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {

        const result = DestructureArray(val);
        setcomponents(() => result);
        setisLoading(false);
        console.log(result)
        // console.log(JSON.stringify(result, null, 4));

    }, [])





    function DestructureArray(arr) {
        if (arr.length === 0) {
            return null; // Base case: empty array
        }

        // Create a new node
        const tempJson = {
            name: JSON.stringify(arr),
            children: []
        };

        if (arr.length === 1) {
            // Base case: single element array
            return tempJson;
        }

        // Split the array
        const midVal = Math.floor(arr.length / 2);
        const leftArr = arr.slice(0, midVal);
        const rightArr = arr.slice(midVal);

        // Recursively process left and right sub-arrays
        if (leftArr.length > 0) {
            tempJson.children.push(DestructureArray(leftArr));
        }
        if (rightArr.length > 0) {
            tempJson.children.push(DestructureArray(rightArr));
        }

        return tempJson;
    }

    return (

        <>
            {!isLoading ?
                <div style={{ width: '1900px', height: '860px', backgroundColor: "white",  }}>
                    <Tree data={components} orientation="vertical" pathFunc={"step"} />
                </div>
                :
                <div>Loading</div>
            }
        </>
    );


}

const BoxContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

// Styled component for each box
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 60px;
  background-color: red;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  
`;

export default ArrayDestructureMain;