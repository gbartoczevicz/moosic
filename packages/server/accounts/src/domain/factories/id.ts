import { Either, left } from '@/utils';

import { IdProvider } from '@/ports/providers';
import { Id } from '@/domain/entities/values';
import { FieldIsRequired, PropsAreRequired } from '@/domain/entities/errors';

export type MakeIdProps = {
  value?: string;
};

export class IdFactory {
  private readonly idProvider: IdProvider;

  public constructor(idProvider: IdProvider) {
    this.idProvider = idProvider;
  }

  public make(props: MakeIdProps): Either<PropsAreRequired | FieldIsRequired, Id> {
    if (!props) {
      return left(new PropsAreRequired());
    }

    const { value } = props;

    const generatedValue = value ?? this.idProvider.generate(value);

    return Id.create({ value: generatedValue });
  }
}
