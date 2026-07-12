import styles from './Article.module.scss';

export type article = {
  img: string;
  title: string;
  description: string;
}

export function Article({article}: {article: article}) {
  return (
    <article className={`${styles.article}`}>
      <div className={`${styles.imgWrapper}`}>
        <img src={article.img} alt={article.title} />
      </div>
      <div className={`${styles.textContainer}`}>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </article>
  )
}