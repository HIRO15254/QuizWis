import { DateResolver } from 'graphql-scalars';

import { pothosBuilder } from './builder';

import './query';
import './object';
import './enum';
import './mutation';

pothosBuilder.addScalarType('DateTime', DateResolver, {});

export const schema = pothosBuilder.toSchema();
