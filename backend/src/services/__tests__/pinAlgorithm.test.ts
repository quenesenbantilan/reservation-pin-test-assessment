import { calculateQueueExtension } from "../reservation.service";

describe("calculateQueueExtension", () => {
  it("returns zero extension when there is no queue", () => {
    const now = new Date();

    const { extendedExpiration, extensionMinutes } = calculateQueueExtension({
      peopleAhead: 0,
      currentExpiration: now
    });

    expect(extensionMinutes).toBe(0);
    expect(extendedExpiration.getTime()).toBe(now.getTime());
  });

  it("extends linearly by 4 minutes per person ahead", () => {
    const baseExpiration = new Date();

    const { extendedExpiration, extensionMinutes } = calculateQueueExtension({
      peopleAhead: 3,
      currentExpiration: baseExpiration
    });

    expect(extensionMinutes).toBe(12);
    expect(
      Math.round(
        (extendedExpiration.getTime() - baseExpiration.getTime()) / 60_000
      )
    ).toBe(12);
  });

  it("caps the extension at 30 minutes", () => {
    const baseExpiration = new Date();

    const { extensionMinutes } = calculateQueueExtension({
      peopleAhead: 20,
      currentExpiration: baseExpiration
    });

    expect(extensionMinutes).toBe(30);
  });
});

