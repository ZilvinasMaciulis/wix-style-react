import Stepper from './Stepper';
import Registry from '@ui-autotools/registry';

const metadata = Registry.getComponentMetadata(Stepper);
metadata.nonEventListenerTestCompliant = true;
metadata.nonReactStrictModeCompliant = true;

metadata.exportedFrom({
  path: 'src/Stepper/Stepper.js',
});

metadata.addSim({
  title: 'Simulation with default props',
  props: {
    steps: [
      { text: 'This is a long step name' },
      { text: 'This is a long step name', type: 'disabled' },
      { text: 'This is a long step name', type: 'disabled' },
      { text: 'This is a long step name', type: 'disabled' },
      { text: 'This is a long step name', type: 'disabled' },
      { text: 'This is a long step name', type: 'disabled' },
      { text: 'This is a long step name', type: 'disabled' },
    ],
    onClick: () => {},
    activeStep: 0,
  },
});
