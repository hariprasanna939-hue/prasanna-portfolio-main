import React from 'react';
import {
  eventDescription,
  eventItems,
  bootcampDescription,
  bootcampItems,
  hackathonDescription,
  hackathonItems,
  sih25Description,
  sih25Items,
  israelIndiaHackathonItems,
  israelIndiaHackathonDescription,
} from '../data/site';
import { Stack3D } from './Stack3D';

export const Beyond: React.FC = () => {
  return (
    <>
      <Stack3D
        id="Event"
        label="Startup Event"
        title="Startup Event"
        description={eventDescription}
        items={eventItems}
        landscape
        noBorder
      />

      <Stack3D
        id="Bootcamp"
        label="Innovation Design and Entrepreneurship"
        title="(IDE) Bootcamp"
        description={bootcampDescription}
        items={bootcampItems}
        landscape
        noBorder
      />

      <Stack3D
        id="Hackathon"
        label="Smart India Hackathon 26"
        title="Hackathon"
        description={hackathonDescription}
        items={hackathonItems}
        landscape
        noBorder
      />

      <Stack3D
        id="sih-25"
        label="Smart India Hackathon 25"
        title="Hackathon"
        description={sih25Description}
        items={sih25Items}
        landscape
        noBorder
      />

      <Stack3D
        id="israel-india-hackathon-2026"
        label="Hackathon"
        title="Israel–India Global Innovators Hackathon 2026"
        description={israelIndiaHackathonDescription}
        items={israelIndiaHackathonItems}
        landscape
        noBorder
      />
    </>
  );
};
