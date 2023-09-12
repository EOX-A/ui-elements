import React from 'react';
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';

// import { GuidelineLink } from '@config/GuidelineLink';

export const configureDocsPage = (componentName) => {
  return () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      {/* {componentName} */}
      {/* <Primary /> */}
      <ArgsTable />
      {/* <Stories /> */}
    </>
  );
};