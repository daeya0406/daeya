import { ErrorCode } from '@/shared/api/error';
import { NotFoundView, ForbiddenView, GenericErrorView } from './views';

type Props = {
  code: ErrorCode;
};

export function ErrorView({ code }: Props) {
  switch (code) {
    case 'NOT_FOUND':
      return <NotFoundView />;
    case 'FORBIDDEN':
      return <ForbiddenView />;
    default:
      return <GenericErrorView />;
  }
}
