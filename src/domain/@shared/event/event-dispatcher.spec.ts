import { EventDispatcher } from './event-dispatcher';
import { SendEmailWhenProductIsCreatedHandler } from '../../product/event/handler/send-email-when-product-is-created-handler';
import { ProductCreatedEvent } from '../../product/event/product-created.event';

describe('Domain events testes', () => {
  it('Should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);
  });

  it('Should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      0
    );
  });

  it('Should unregister all events handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeUndefined();
  });

  it('Sould notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
