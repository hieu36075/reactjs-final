import React, { useState, useEffect, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import { useDispatch } from 'react-redux';

const CustomAsyncSelect = ({ fetchDataAction, id, onChange, isClearable  }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [prevId, setPrevId] = useState(true);
  const [previousId, setPreviousId] = useState(null);
  const [oldId, setOldId] = useState(null);
  const fetchData = async (pageNumber ) => {
    setIsLoading(true);
    try {
      const actionResult = await dispatch(fetchDataAction({ id, page: pageNumber, perPage: 7 }));
      if (fetchDataAction.fulfilled.match(actionResult)) {
        const newData = actionResult.payload.data;
        if(prevId){
          setData(prevData => [...prevData, ...newData]);
        }else{
          setData(newData);
          setHasMore(true);
        }
        if (newData.length === 0) {
          setHasMore(false);
        } 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    if(id){
      fetchData(1);
      setPreviousId(oldId); // Save the previous id before updating it
      setOldId(id)
      if(previousId !== oldId){
        setData([])
        setPrevId(false)
      }else{
        setPrevId(true)

      }
    }
  }, [id]);

  const handleOnScrollBottom = async () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const loadOptions = (inputValue, callback) => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    const options = filteredData.map(item => ({
      value: item.id,
      label: item.name,
    }));
    callback(options);
  };

  return (
    <AsyncSelect
      defaultOptions={data.map(item => ({ value: item.id, label: item.name }))}
      cacheOptions
      loadOptions={loadOptions}
      onChange={selectedOption => {
        if (selectedOption) {
          onChange(selectedOption);
        }else{
          onChange("")
        }
      }}
      isLoading={isLoading}
      isVirtualized
      onMenuScrollToBottom={handleOnScrollBottom}
      isClearable={isClearable}
    />
  );
};

export default CustomAsyncSelect;
