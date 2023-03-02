import { FC } from 'react';
import Link from 'next/link';

import { parseContent } from '~/utils';

const ALink: FC<{
  scroll?: boolean;
  role?: string;
  id?: string;
  title?: string;
  className?: string;
  content?: string;
  href: string | any;
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ children, className, content, style, ...props }) => {
  const preventDefault = (e) => {
    if (props.href === '#') {
      e.preventDefault();
    }

    if (props.onClick) {
      props.onClick();
    }
  };

  return content ? (
    <Link {...props} href={props.href} legacyBehavior>
      <a
        className={className}
        style={style}
        onClick={preventDefault}
        dangerouslySetInnerHTML={parseContent(content)}
      >
        {children}
      </a>
    </Link>
  ) : (
    <Link {...props} href={props.href} legacyBehavior>
      <a className={className} style={style} onClick={preventDefault}>
        {children}
      </a>
    </Link>
  );
};

export default ALink;
