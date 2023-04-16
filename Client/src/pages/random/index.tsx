import { Select, Title, Text } from '@mantine/core';
import axios from 'axios';
import React from 'react';

const Random = () => {
  const [userSearch, setUserSearch] = React.useState<string>();
  const locationData = useGetLocations();
  const roomsData = useGetRooms(userSearch);
  return (
    <div className='p-4'>
      <div className='grid gap-4 my-4'>
        <Title
          order={2}
          className='text-center text-green-500'
        >
          Search Room
        </Title>
        <Select
          className='max-w-md w-full mx-auto'
          clearable
          onChange={(e) => setUserSearch(e ?? '')}
          placeholder='Search Location'
          searchable
          nothingFound='No options'
          data={locationData?.LocationList?.map((item) => item.name) ?? []}
        />
      </div>
      {roomsData?.isLoading && <Text>Loading</Text>}
      {roomsData?.isError && (
        <Text className='text-red-400'>Error Occured</Text>
      )}
      {roomsData?.HotelList && (
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {roomsData?.HotelList?.map((item) => (
            <HotelCard
              key={item?.id}
              {...item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Random;

export const HotelCard = (props: RoomData) => {
  return (
    <div className='grid border border-solid border-gray-300 rounded-xl overflow-hidden hover:border-green-600 hover:shadow cursor-pointer text-gray-900 hover:text-green-800 duration-300 hover:rounded-none'>
      <img
        style={{ objectFit: 'cover', height: '200px', width: '100%' }}
        src={props?.images}
        alt={props?.hotel?.name}
      />
      <div className='grid gap-2 p-2'>
        <div className='flex gap-2 justify-between'>
          <div>
            <Title order={3}>{props?.hotel?.name}</Title>
            <Text>{props?.hotel?.address}</Text>
          </div>
          <div className='grid text-right'>
            <Text className='text-sm'>Price:</Text>
            <Title
              order={3}
              color='green'
              className='font-light'
            >
              Rs:{props?.price} /-
            </Title>
          </div>
        </div>
        <div>
          <Title
            order={5}
            fw={600}
            className='leading-0'
          >
            Features:
          </Title>
          <div className='text-sm flex gap-4 flex-wrap'>
            {props?.gym && <li className='ml-4'> Gym</li>}
            {props?.swimmingPool && <li className='ml-4'> SwimmingPool</li>}
            {props?.balcony && <li className='ml-4'> Balcony</li>}
            {props?.sceneryFacing && <li className='ml-4'> SceneryFacing</li>}
            {props?.ticketing && <li className='ml-4'> Ticketing</li>}
          </div>
        </div>
      </div>
    </div>
  );
};

export type RoomData = {
  id: string;
  price: number;
  images: string;
  roomNo: number;
  sceneryFacing: boolean;
  rental: boolean;
  ticketing: boolean;
  balcony: boolean;
  swimmingPool: boolean;
  gym: boolean;
  hotel: {
    id: string;
    name: string;
    address: string;
  };
};
export type LocationData = {
  id: string;
  name: string;
};

export const useGetRooms = (location = '') => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [HotelList, setHotelList] = React.useState<RoomData[]>();

  React.useEffect(() => {

      axios
        .get(
          location
            ? `http://localhost:3500/rooms/location/${location}`
            : 'http://localhost:3500/rooms/'
        )
        .then((d) => {
          setIsLoading(false);
          setHotelList(d?.data);
        })
        .catch((e) => {
          console.log(e);
          setIsError(true);
        });
  }, [location]);

  return { isLoading, isError, HotelList };
};

export const useGetLocations = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [LocationList, setLocationList] = React.useState<LocationData[]>();

  React.useEffect(() => {
    axios
      .get(`http://localhost:3500/locations`)
      .then((d) => {
        setIsLoading(false);
        setLocationList(d?.data);
      })
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
  }, []);

  return { isLoading, isError, LocationList };
};
