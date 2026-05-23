type JsonLdData = Record<string, unknown>;

/**
 * 構造化データ(JSON-LD)を <script type="application/ld+json"> で出力する。
 * data は自前の信頼できるオブジェクトのみを渡すこと。
 */
export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // </script> 混入によるブレイクアウトを防ぐため < をエスケープ
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
