import { SignUp } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
  return <>
  {/* [segment]-dynamic route [...segment]-catch‑all [[...segment]]-optional catch‑all. */}
  <SignUp />                         
  </>;
};
export default Page;