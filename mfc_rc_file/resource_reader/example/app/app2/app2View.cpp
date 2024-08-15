
// app2View.cpp : Capp2View クラスの実装
//

#include "pch.h"
#include "framework.h"
// SHARED_HANDLERS は、プレビュー、縮小版、および検索フィルター ハンドラーを実装している ATL プロジェクトで定義でき、
// そのプロジェクトとのドキュメント コードの共有を可能にします。
#ifndef SHARED_HANDLERS
#include "app2.h"
#endif

#include "app2Doc.h"
#include "app2View.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// Capp2View

IMPLEMENT_DYNCREATE(Capp2View, CView)

BEGIN_MESSAGE_MAP(Capp2View, CView)
	// 標準印刷コマンド
	ON_COMMAND(ID_FILE_PRINT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &Capp2View::OnFilePrintPreview)
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
END_MESSAGE_MAP()

// Capp2View コンストラクション/デストラクション

Capp2View::Capp2View() noexcept
{
	// TODO: 構築コードをここに追加します。

}

Capp2View::~Capp2View()
{
}

BOOL Capp2View::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: この位置で CREATESTRUCT cs を修正して Window クラスまたはスタイルを
	//  修正してください。

	return CView::PreCreateWindow(cs);
}

// Capp2View 描画

void Capp2View::OnDraw(CDC* /*pDC*/)
{
	Capp2Doc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
}


// Capp2View の印刷


void Capp2View::OnFilePrintPreview()
{
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
}

BOOL Capp2View::OnPreparePrinting(CPrintInfo* pInfo)
{
	// 既定の印刷準備
	return DoPreparePrinting(pInfo);
}

void Capp2View::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷前の特別な初期化処理を追加してください。
}

void Capp2View::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷後の後処理を追加してください。
}

void Capp2View::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void Capp2View::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}


// Capp2View の診断

#ifdef _DEBUG
void Capp2View::AssertValid() const
{
	CView::AssertValid();
}

void Capp2View::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

Capp2Doc* Capp2View::GetDocument() const // デバッグ以外のバージョンはインラインです。
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(Capp2Doc)));
	return (Capp2Doc*)m_pDocument;
}
#endif //_DEBUG


// Capp2View メッセージ ハンドラー
