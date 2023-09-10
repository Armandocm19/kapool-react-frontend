interface Props {
  styles: string
  url: string
}

export function ImageToGame ({ styles, url }: Props) {
  return (
        <picture className={`${styles}`}>
        <img
          src={url}
          alt="imagen para la pregunta"
        />
      </picture>
  )
}
