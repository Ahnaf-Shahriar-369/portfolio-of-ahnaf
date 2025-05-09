import { useEffect, useRef, useState, CSSProperties } from 'react';

type Point = { x: number; y: number; };
const easeFactor = 0.15;

// Map HTML tags to cursor variant classes
const tagToVariant: Record<string, string> = {
  a: 'cursor--link',
  button: 'cursor--button',
  img: 'cursor--img',
  video: 'cursor--video',
  audio: 'cursor--audio',
  canvas: 'cursor--canvas',
  svg: 'cursor--svg',
  iframe: 'cursor--iframe',
  input: 'cursor--input',
  textarea: 'cursor--textarea',
  select: 'cursor--select',
  option: 'cursor--option',
  label: 'cursor--label',
  summary: 'cursor--summary',
  nav: 'cursor--nav',
  header: 'cursor--header',
  footer: 'cursor--footer',
  section: 'cursor--section',
  article: 'cursor--article',
  main: 'cursor--main',
  aside: 'cursor--aside',
  ul: 'cursor--ul',
  ol: 'cursor--ol',
  li: 'cursor--li',
  table: 'cursor--table',
  tr: 'cursor--tr',
  td: 'cursor--td',
  th: 'cursor--th',
  blockquote: 'cursor--blockquote',
  pre: 'cursor--pre',
  code: 'cursor--code',
  dl: 'cursor--dl',
  dt: 'cursor--dt',
  dd: 'cursor--dd',
};

const Cursor: React.FC = () => {
  const target = useRef<Point>({ x: 0, y: 0 });
  const pos    = useRef<Point>({ x: 0, y: 0 });
  const [, setTick] = useState<number>(0);
  const [variant, setVariant] = useState<string>('');
  const [hidden, setHidden]   = useState<boolean>(false);

  // Track mouse move & element under pointer
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      setVariant(tagToVariant[tag] || '');
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('blur', onMouseLeave);
    window.addEventListener('focus', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('blur', onMouseLeave);
      window.removeEventListener('focus', onMouseEnter);
    };
  }, []);

  // Smooth trailing animation
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * easeFactor;
      pos.current.y += (target.current.y - pos.current.y) * easeFactor;
      setTick(t => t + 1);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Assemble style and classes
  const style: CSSProperties = {
    left: `${pos.current.x}px`,
    top:  `${pos.current.y}px`,
  };
  const classes = ['cursor', variant, hidden && 'cursor--hidden']
    .filter(Boolean)
    .join(' ');

  return <div className={classes} style={style} />;
};

export default Cursor;

