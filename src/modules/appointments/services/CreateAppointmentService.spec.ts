import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345',
        });

        expect(appointment).toHaveProperty('id');
    });
    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointmentDate = new Date(2020, 11, 18, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '12345',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
