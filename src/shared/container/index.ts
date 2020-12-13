import { container } from 'tsyringe';

// eslint-disable-next-line import/no-unresolved
import '@modules/users/providers';
import './providers';

import IAppointmentsRepostitory from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepostitory from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepostitory from '@modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IAppointmentsRepostitory>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepostitory>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokensRepostitory>(
    'UserTokenRepository',
    UserTokenRepository,
);
