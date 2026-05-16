import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Separator,
  Card,
  CardContent,
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  Badge,
} from '@overlens/legacy-components'
import {
  CheckSolidIcon,
  CognitionLineIcon,
  CalendarSolidIcon,
  BoltSolidIcon,
  ShieldSolidIcon,
  LockSolidIcon,
  ReturnSolidIcon,
} from '@overlens/legacy-icons'

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-stagger, .reveal-left, .reveal-right'
    )
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return progress
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const personas = [
  { title: 'Criador independente', desc: 'Cria conteúdo, projetos ou produtos por conta própria e quer parar de improvisar a cada lançamento. Precisa de fluência em IA sem virar técnico.' },
  { title: 'Designer', desc: 'Já produz no Figma, no Photoshop, no que for. Quer integrar IA à prática sem perder critério estético nem virar operador de prompt.' },
  { title: 'Artista', desc: 'Vive de obra, processo e pesquisa. Quer usar IA como expansão da própria linguagem, sem virar filtro pronto que apaga a autoria.' },
  { title: 'Desenvolvedor', desc: 'Já programa há tempos. Quer integrar IA ao stack como linguagem nativa e operar sistemas em vez de só escrever código, sem virar promptador.' },
  { title: 'Empreendedor criativo', desc: 'Tem um negócio em pé, mas sabe que o jogo da próxima década depende de saber operar sistemas criativos com IA, não só contratar quem opera.' },
  { title: 'Curioso', desc: 'Não tem formação numa única caixa. Cruza áreas, conecta ideias, vê padrões. O Overpass é praticamente uma academia para esse perfil.' },
]

// Depoimentos curados | fonte: .claude/context/depoimentos.md
const testimonials = [
  { initials: 'JV', name: 'Jonathan Vieira', role: 'Designer : Aluno Overpass', group: 'plataforma',
    quote: 'Sinceramente, em anos de estudo de design, é o primeiro curso livre que me surpreende já na primeira aula. Parabéns!' },
  { initials: 'KG', name: 'Kalleb Henrique Afonso Garcia', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'Comprei o curso hoje e já me surpreendi com o nível técnico repassado, especialmente por ter base no repertório acadêmico. Não fiz faculdade de design, mas o que está sendo entregue aqui, não vi mais em nenhum outro lugar!' },
  { initials: 'LA', name: 'Lívia Alves Fernandes', role: 'Aluna Overpass', group: 'plataforma',
    quote: 'Que aula rica!! Nunca vi um curso tão profundo em conteúdo como esse e isso me faz ter orgulho de cada centavo investido nessa plataforma!' },
  { initials: 'NC', name: 'Nahila Coelho', role: 'Aluna Overpass', group: 'plataforma',
    quote: 'Nem na faculdade eu tive uma aula técnica assim tão completa e tão didática de cores. Todas dúvidas que eu tinha até aqui foram sanadas com sucesso.' },
  { initials: 'NA', name: 'Nathália Araujo', role: 'Aluna Overpass', group: 'plataforma',
    quote: 'Não lembro de uma aula igual a essa no início da faculdade 🥲 agora tá fazendo mais sentido.' },
  { initials: 'TX', name: 'Tiago Matias Xavier', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'Muito interessante que o objetivo do projeto tem mostrado, querendo formar pessoas de verdade, com profundidade.' },
  { initials: 'RM', name: 'Ramon Rodrigues Marques', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'O curso é tão completo que aborda até as suas crenças, e isso é fundamental.' },
  { initials: 'CP', name: 'Cys Pacheco', role: 'Aluna Overpass', group: 'plataforma',
    quote: 'Esta aula foi, sem dúvidas, um divisor de águas: ouso dizer que é uma releitura moderna da Alegoria da Caverna, de Platão.' },
  { initials: 'AA', name: 'Andressa Alves da Silva Carvalho', role: 'Designer : Aluna Overpass', group: 'plataforma',
    quote: 'Eu amo a didática do Ruan, ele me ajuda a pensar a raciocinar, ele é o nosso Filósofo do Design.' },
  { initials: 'VD', name: 'Vinni Del Poço', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'A plataforma tá linda, com visual impecável e densidade rara. Parabéns à equipe da Overlens!' },
  { initials: 'BL', name: 'Bruno Lujan', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'Assinei o Overpass ontem e decidi começar pelas lives e, sinceramente, que sensacional os ensinamentos delas. Inacreditável que você disponibiliza esse conteúdo de graça toda semana.' },
  { initials: 'BC', name: 'Bruno Chaves', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'Eu to extremamente feliz por ter acreditado e investido nesse curso. A Overlens apareceu do nada no meu feed... Eu vi os conteúdos, acreditei e confiei muito, e agora a cada aula é um monte de coisa que encaixa na minha cabeça.' },
  { initials: 'MT', name: 'Maiham Therena', role: 'Designer : Aluna Overpass', group: 'virada',
    quote: 'Curso realmente fantástico, consegui apresentar e fazer um fechamento no meio da apresentação. Do meio para o final o cliente já perguntou qual é o valor e quais os próximos passos. Em pensar que eu já tinha pensado em desistir de ser designer por não saber conversar e nem entender de processos.' },
  { initials: 'BR', name: 'Bia Rosa', role: 'Designer : Aluna Overpass', group: 'virada',
    quote: 'Quando eu comprei tava muito mal de grana, tinha sido desligada, mas achei que ia me ajudar. E, agora, to conseguindo entrar em contato com os primeiros clientes e nem terminei o curso.' },
  { initials: 'AL', name: 'André Lucas Jesus Cavalcante', role: 'Aluno Overpass', group: 'virada',
    quote: 'O maior valor que eu pude tirar desse curso foi como abordar um lead. Tenho muita dificuldade em conversar e vender o meu serviço. E os ensinamentos daquela aula me ajudaram bastante. SHOW DEMAIS!' },
  { initials: 'MV', name: 'Monica Veiga', role: 'Mestranda : Aluna Overpass', group: 'manifesto',
    quote: 'Cara, essa aula me caiu como uma luva hoje. Tô num mestrado interdisciplinar, mas que me parece interdisciplinar só na intenção, porque nem a universidade tá preparada pra sustentar um projeto desses. A minha dissertação vai ter que ter um capítulo falando sobre o obstáculo epistemológico, e definitivamente você será mencionado, assim como a Overlens. Só tenho a te agradecer.' },
  { initials: 'VS', name: 'Vinicio', role: 'Assistente social : Aluno Overpass', group: 'manifesto',
    quote: 'Ruan você está abrindo tantos horizontes aqui nessa aula, e quebrando crenças que eu tinha. Está sendo terapêutico para mim enquanto assistente social. Estou empolgado há um ano com essa transformação que a IA está gerando.' },
  { initials: 'BT', name: 'Beatriz Ribeiro', role: 'Profissional criativa : Aluna Overpass', group: 'virada',
    quote: 'Filha de pais educadores da rede pública em uma zona periférica de São Paulo, decidi que dedicaria minha vida à área social. Depois de 10 anos atuando na área, entendi que sou uma profissional criativa e que o impacto que quero ver no mundo será através da arte e da cultura.' },
  { initials: 'IB', name: 'Igor Batista', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'Já valeu o investimento esta aula!' },
  { initials: 'JA', name: 'Jéssica Almondes', role: 'Designer : Aluna Overpass', group: 'plataforma',
    quote: 'Depois de anos atuando como designer, hoje foi que descobri o Double Diamond. Fez todo o sentido.' },
  { initials: 'RO', name: 'Ricardo Moreira', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'O Ruan é mestre em storytelling e nesta aula ajudou-me muito a sustentar aquilo que fazemos e como olhar para vários assuntos com olhos de criativo.' },
  { initials: 'MK', name: 'Marcella Kamilla', role: 'Designer : Aluna Overpass', group: 'virada',
    quote: 'O final dessa aula quase me fez chorar. Hoje vejo que o design é realmente meu lugar.' },
  { initials: 'NR', name: 'Nayara Ribeiro', role: 'Designer : Aluna Overpass', group: 'virada',
    quote: 'Eu estou CHOCADA! Sempre me ancorei na desculpa de que "Designer" não precisa desenhar. Quando era mais nova eu AMAVA desenhar e não entendia o motivo de ter parado. Agora vou voltar a desenvolver essa habilidade. Obrigada por tanto.' },
  { initials: 'BF', name: 'Beatriz Ferreira', role: 'Aluna Overpass', group: 'plataforma',
    quote: 'Se a introdução da matéria já está explodindo a minha mente, imagina o restante!? Que conteúdo precioso!' },
  { initials: 'LP', name: 'Luiz Prudente', role: 'Aluno Overpass', group: 'virada',
    quote: 'Genial. Simplesmente genial. A questão das lentes foi o que fez me escolher a profissão, então ter uma definição assertiva com centenas de referências me trouxe uma clareza imensa que é isso que quero mesmo.' },
  { initials: 'HT', name: 'Humberto Tello', role: 'Aluno Overpass', group: 'virada',
    quote: 'Aula excelente, mudou muito a forma como eu enxergo o design.' },
  { initials: 'MY', name: 'Marilia Yamashita', role: 'Aluna Overpass', group: 'virada',
    quote: 'Que aula densa! Mas minhas logos nunca mais serão as mesmas. Valeu muito.' },
  { initials: 'TY', name: 'Thayane Azevedo', role: 'Aluna Overpass', group: 'plataforma',
    quote: 'É esse nível de profundidade que venho buscando. Aula riquíssima, você foi muito além do esperado, e essa ainda é a primeira aula 🤯' },
  { initials: 'CR', name: 'Carlos Ramos', role: 'Aluno Overpass', group: 'manifesto',
    quote: 'Eu precisava ler cada palavra desse manifesto. Acho que encontrei o meu lugar, o meu propósito. Encontrei o verdadeiro sentido de criação.' },
  { initials: 'RN', name: 'Robert Nunes', role: 'Aluno Overpass', group: 'plataforma',
    quote: 'O tanto de novas conexões neurais que eu tive com essa aula não está escrito.' },
  { initials: 'FD', name: 'Fabiana Dauksys Diamante', role: 'Aluna Overpass', group: 'plataforma',
    quote: 'Essa aula e a Meta-aprendizado abriram a minha mente de uma maneira que não posso descrever.' },
  { initials: 'NP', name: 'Natália Pereira', role: 'Aluna Overpass', group: 'manifesto',
    quote: 'Quando li esse manifesto, senti como se alguém tivesse aberto a janela de uma sala onde eu respirava o mesmo air reciclado há anos. A frase "Você não está criando, está sendo usado" me atravessou como um raio.' },
]

const faqs = [
  { q: 'Preciso saber programar ou já ter experiência com IA?',
    a: 'Não. As trilhas começam do nível necessário pra cada perfil. Quem nunca usou IA encontra ponto de entrada. Quem já usa encontra profundidade.' },
  { q: 'O Overpass tem horário fixo, aulas ao vivo?',
    a: 'Não. Você acessa quando quiser, no seu ritmo. As trilhas têm sequência recomendada, mas a vida é sua.' },
  { q: 'O que diferencia o Overpass de outras plataformas?',
    a: 'Não é catálogo. É jornada. Outras plataformas te dão acesso a 500 cursos e você não termina nenhum. O Overpass te dá um caminho, um sistema de progressão e desafios que te obrigam a aplicar.' },
  { q: 'Tem certificado?',
    a: 'Sim, vinculado a marcos de evolução reais, não a "horas assistidas". O certificado prova que você fez, não que você esteve presente.' },
  { q: 'Posso cancelar quando quiser?',
    a: 'Sim. Sem fidelidade, sem multa. Você entra enquanto faz sentido, sai quando não fizer mais.' },
  { q: 'E se eu não conseguir acompanhar o ritmo?',
    a: 'O ritmo é seu. O sistema marca onde você parou, sugere próximos passos e mantém a progressão visível mesmo se você sair e voltar.' },
  { q: 'O Overpass garante resultados financeiros?',
    a: 'Não. Resultados dependem de contexto, decisões e aplicação individual. O que o Overpass oferece é estrutura. A construção é sua.' },
  { q: 'O Overpass é pra mim se eu só quero prompts prontos?',
    a: 'Não. O Overpass é pra quem quer desenvolver autonomia criativa. Quem busca prompt-de-bolso encontra coisa melhor no Twitter. Quem quer construir capacidade encontra aqui.' },
]

// ── ICONS ─────────────────────────────────────────────────────────────────────
function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zM6.6 20.13a9.86 9.86 0 005.452 1.645h.005c5.448 0 9.886-4.434 9.888-9.885a9.823 9.823 0 00-2.892-6.991 9.825 9.825 0 00-6.99-2.899c-5.452 0-9.887 4.434-9.889 9.886a9.86 9.86 0 001.51 5.258l.235.374-1 3.648 3.74-.981.94.541zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  )
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

// Faculty-style eyebrow pill
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="chip-pill mb-6 inline-flex">{children}</span>
}

function ArrowPill({
  children, href = '#', dark = false, fullWidth = false, size = 'lg', onClick,
}: {
  children: React.ReactNode; href?: string; dark?: boolean; fullWidth?: boolean; size?: 'lg' | 'default'; onClick?: () => void
}) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full"
        style={{ background: dark ? 'transparent' : 'rgba(0,0,0,0.15)' }}>
        <ArrowRight size={13} />
      </span>
    </>
  )
  if (onClick) {
    return (
      <Button variant={dark ? 'outline' : 'default'} size={size}
        className={fullWidth ? 'w-full justify-between' : ''}
        onClick={onClick}>
        {inner}
      </Button>
    )
  }
  return (
    <Button asChild variant={dark ? 'outline' : 'default'} size={size}
      className={fullWidth ? 'w-full justify-between' : ''}>
      <a href={href}>{inner}</a>
    </Button>
  )
}

// Testimonial card using Avatar from design system
function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="testimonial-card">
      <p className="t-quote">{t.quote}</p>
      <div className="t-author">
        <Avatar className="t-avatar w-10 h-10 border" style={{ borderColor: 'var(--line-strong)' }}>
          <AvatarFallback className="t-initials text-[13px]"
            style={{ background: 'var(--surface-2)', color: 'var(--cream-soft)', fontFamily: 'Outfit, sans-serif' }}>
            {t.initials}
          </AvatarFallback>
        </Avatar>
        <div className="t-info">
          <span className="t-name">{t.name}</span>
          <span className="t-role">{t.role}</span>
        </div>
      </div>
    </div>
  )
}

// ── APPLICATION MODAL ─────────────────────────────────────────────────────────
type FormData = { nome: string; email: string; whatsapp: string; perfil: string }

function ApplicationModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const onSubmit = (data: FormData) => {
    console.log('Aplicação:', data) // substitua pelo seu endpoint/CRM
    setSubmitted(true)
  }

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    background: 'var(--bg-2)',
    border: `1px solid ${hasError ? '#ef4444' : 'var(--line-strong)'}`,
    borderRadius: 12,
    padding: '10px 14px',
    color: 'var(--cream)',
    fontFamily: 'inherit',
    fontSize: 14,
    outline: 'none',
    width: '100%',
  })

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 relative"
        style={{ background: 'var(--surface)', border: '1px solid var(--line-strong)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full"
          style={{ color: 'var(--cream-mute)', background: 'var(--bg-2)', border: '1px solid var(--line)' }}
          aria-label="Fechar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <p className="font-eyebrow text-[10px] mb-1" style={{ color: 'var(--cream-mute)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Lote Founders</p>
            <h3 className="font-display text-[22px] mb-6" style={{ color: 'var(--cream)', letterSpacing: '-0.02em' }}>Fazer sua aplicação</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[12px]" style={{ color: 'var(--cream-soft)' }}>Nome completo</label>
                <input {...register('nome', { required: true })} placeholder="Seu nome" style={inputStyle(!!errors.nome)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[12px]" style={{ color: 'var(--cream-soft)' }}>E-mail</label>
                <input {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} type="email" placeholder="seu@email.com" style={inputStyle(!!errors.email)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[12px]" style={{ color: 'var(--cream-soft)' }}>WhatsApp</label>
                <input {...register('whatsapp', { required: true })} type="tel" placeholder="(11) 99999-9999" style={inputStyle(!!errors.whatsapp)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[12px]" style={{ color: 'var(--cream-soft)' }}>Qual é o seu perfil?</label>
                <select {...register('perfil', { required: true })} style={{ ...inputStyle(!!errors.perfil), appearance: 'none' }}>
                  <option value="">Selecione...</option>
                  <option value="criador">Criador independente</option>
                  <option value="designer">Designer</option>
                  <option value="artista">Artista</option>
                  <option value="dev">Desenvolvedor</option>
                  <option value="empreendedor">Empreendedor criativo</option>
                  <option value="curioso">Curioso</option>
                </select>
              </div>
              <Button type="submit" variant="default" size="lg" className="w-full justify-between mt-2">
                <span>Fazer aplicação</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(0,0,0,0.15)' }}>
                  <ArrowRight size={13} />
                </span>
              </Button>
            </form>
            <p className="font-body text-[11px] text-center mt-4" style={{ color: 'var(--cream-mute)' }}>
              Garantia de 7 dias · Cancele quando quiser
            </p>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--line-strong)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--cream)' }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-display text-[22px] mb-3" style={{ color: 'var(--cream)', letterSpacing: '-0.02em' }}>Aplicação recebida!</h3>
            <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--cream-soft)' }}>
              Falaremos com você em breve pelo WhatsApp para confirmar sua vaga no Lote Founders.
            </p>
            <button onClick={onClose} className="mt-8 font-body text-[13px]" style={{ color: 'var(--cream-mute)', textDecoration: 'underline' }}>
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── HOW IT WORKS : visual + tabs layout ──────────────────────────────────────
const howSteps = [
  {
    title: 'Trilhas',
    desc: 'Caminhos de aprendizagem estruturados que respondem à pergunta "o que preciso aprender agora?". Você não escolhe vídeos avulsos. Entra em uma rota com sequência intencional.',
    icon: (
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* sombra projetada */}
        <ellipse cx="100" cy="146" rx="64" ry="6" fill="#000" opacity="0.18" />
        {/* aulas empilhadas atrás (sequência da trilha) */}
        <rect x="58" y="22" width="100" height="10" rx="4" fill="#fefff5" />
        <rect x="42" y="34" width="118" height="10" rx="4" fill="#2a2a2a" />
        {/* card principal da aula (vídeo em foco) */}
        <rect x="26" y="46" width="148" height="84" rx="12" fill="#0d0d0d" />
        {/* highlight no topo do card */}
        <path d="M30 50 L170 50" stroke="#fefff5" strokeWidth="1" opacity="0.1" />
        {/* play button */}
        <circle cx="100" cy="88" r="24" fill="none" stroke="#fefff5" strokeWidth="1.5" opacity="0.32" />
        <path d="M94 78 L94 98 L114 88 Z" fill="#fefff5" />
      </svg>
    ),
  },
  {
    title: 'Desafios',
    desc: 'Cada trilha tem desafios práticos. Aplicação real, não exercício decorativo. Você avança fazendo, não assistindo, cada entrega vira evidência concreta do que você consegue construir.',
    icon: (
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="hwDome" cx="0.35" cy="0.30" r="0.95">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="60%" stopColor="#0d0d0d" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
        {/* sombra projetada */}
        <ellipse cx="100" cy="142" rx="56" ry="6" fill="#000" opacity="0.18" />
        {/* "back peek" claro atrás do alvo (depth) */}
        <ellipse cx="100" cy="76" rx="58" ry="56" fill="#fefff5" />
        {/* corpo do alvo (esfera/dome escura com gradiente) */}
        <circle cx="100" cy="78" r="54" fill="url(#hwDome)" />
        {/* anéis (target indentado) */}
        <circle cx="100" cy="78" r="38" fill="none" stroke="#fefff5" strokeWidth="1.5" opacity="0.14" />
        <circle cx="100" cy="78" r="22" fill="none" stroke="#fefff5" strokeWidth="1.5" opacity="0.2" />
        {/* bullseye */}
        <circle cx="100" cy="78" r="7" fill="#fefff5" opacity="0.92" />
        {/* highlight no topo (sombra/luz) */}
        <path d="M68 38 A 54 54 0 0 1 132 38" stroke="#fefff5" strokeWidth="1.2" opacity="0.18" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Marcos',
    desc: 'Cada conquista é reconhecida: níveis, badges e evolução visível. O Overpass mostra, no eixo do tempo, o que você se tornou, não quantas horas você assistiu.',
    icon: (
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="hwTrophy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1f1f" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        {/* sombra projetada */}
        <ellipse cx="100" cy="146" rx="48" ry="5" fill="#000" opacity="0.2" />
        {/* alças da taça (atrás) */}
        <path d="M62 46 L60 46 C 50 46 46 56 46 66 C 46 78 56 90 70 90" stroke="#0d0d0d" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M138 46 L140 46 C 150 46 154 56 154 66 C 154 78 144 90 130 90" stroke="#0d0d0d" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* "lid" claro peeking atrás (depth no topo) */}
        <path d="M68 24 L132 24 L132 38 L68 38 Z" fill="#fefff5" />
        {/* corpo da taça */}
        <path d="M66 34 L134 34 L134 70 C 134 90 118 110 100 110 C 82 110 66 90 66 70 Z" fill="url(#hwTrophy)" />
        {/* edge highlight no topo da taça */}
        <path d="M66 38 L134 38" stroke="#fefff5" strokeWidth="1" opacity="0.18" />
        {/* base/haste */}
        <rect x="92" y="108" width="16" height="18" fill="#0d0d0d" />
        <rect x="68" y="124" width="64" height="12" rx="3" fill="#0d0d0d" />
        {/* estrela/medalha na taça */}
        <circle cx="100" cy="68" r="13" fill="none" stroke="#fefff5" strokeWidth="1.4" opacity="0.3" />
        <path d="M100 60 L102 66 L108 66 L103 70 L105 76 L100 72 L95 76 L97 70 L92 66 L98 66 Z" fill="#fefff5" opacity="0.55" />
      </svg>
    ),
  },
]

function HowItWorks() {
  const [active, setActive] = useState(0)
  const step = howSteps[active]
  return (
    <section id="como-funciona" className="section-screen py-20 px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-5xl mx-auto mb-16 reveal">
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(28px, 3.6vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em', whiteSpace: 'nowrap' }}>
            Um sistema de três camadas
          </h2>
          <p className="font-body hero-banner-sub" style={{ color: 'var(--cream-soft)', margin: '0 auto', textAlign: 'center', maxWidth: 'none' }}>
            O Overpass funciona em conjunto, não<br />como uma biblioteca de aulas avulsas.
          </p>
        </div>
        <div className="how-grid reveal">
          <div className="how-visual" key={active}>
            {step.icon}
          </div>
          <div className="how-tabs">
            {howSteps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                className={`how-tab${i === active ? ' is-active' : ''}`}
                aria-pressed={i === active}
              >
                {s.title}
              </button>
            ))}
          </div>
          <p className="how-desc">{step.desc}</p>
        </div>
      </div>
    </section>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal()
  const scrollProgress = useScrollProgress()
  const [showForm, setShowForm] = useState(false)
  const [testimonialsExpanded, setTestimonialsExpanded] = useState(false)
  const openForm = () => setShowForm(true)

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>

      {/* ── SCROLL PROGRESS ── */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ── NAV : Faculty 3-col grid ── */}
      <nav className="nav-simple fixed top-0 inset-x-0 z-50 px-8 py-4"
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)' }}>
        <a href="#" aria-label="Overpass">
          <img src="/overlens-white.png" alt="Overlens" style={{ height: 18, width: 'auto', display: 'block' }} />
        </a>
        <div className="flex justify-end">
          <Button variant="default" size="sm" onClick={openForm}>
            Fazer aplicação <ArrowRight size={12} />
          </Button>
        </div>
      </nav>

      {/* ── 01. HERO : image full-bleed, centered content ── */}
      <section className="hero-banner">
        <img src="/hero-banner.png?v=2" alt="Overpass, plataforma de evolução criativa" className="hero-banner-img" />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content hero-animate">
          <Eyebrow>Overpass</Eyebrow>
          <h1 className="font-display hero-banner-title">
            O ecossistema da<br /><span className="hl-accent">evolução criativa</span>
          </h1>
          <p className="font-body hero-banner-sub">
            Acumular cursos ficou fácil. Bibliotecas de conteúdo estão saturadas. Vencerá quem trocar a estante de cursos por um sistema que mede, exige e avança junto com quem aprende.
          </p>
          <div className="hero-banner-cta" style={{ marginTop: 56 }}>
            <ArrowPill onClick={openForm}>Fazer aplicação</ArrowPill>
            <ArrowPill href="#por-que" dark>Conhecer mais</ArrowPill>
          </div>
        </div>
      </section>

      {/* ── 02. CARROSSEL DE TRILHAS ── */}
      <section className="ticker-section">
        <div className="marquee">
          <div className="marquee-track">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex" style={{ gap: 12 }}>
                {[
                  { title: 'Protocolo 3-2-1', image: '/cards/protocolo-3-2-1.png' },
                  { title: 'AI First',         image: '/cards/ai-first.png' },
                  { title: 'Nexgen',           image: '/cards/nexgen.png' },
                  { title: 'Syntax',           image: '/cards/syntax.png' },
                  { title: 'Codexia',          image: '/cards/codexia.png' },
                  { title: 'Chrome',           image: '/cards/chrome.png' },
                  { title: 'Spectrum',         image: '/cards/spectrum.png' },
                  { title: 'Synthetic',        image: '/cards/synthetic.png' },
                  { title: 'Expedição Global', image: '/cards/expedicao-global.png' },
                  { title: 'FIT',              image: '/cards/fit.png' },
                  { title: 'Maestro',          image: '/cards/maestro.png' },
                  { title: 'Codexia II',       image: '/cards/codexia-1.png' },
                ].map((c, i) => (
                  <div key={`${dup}-${i}`} className="marquee-card">
                    <img src={c.image} alt={c.title} loading="lazy" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. POR QUE ENTRAR ── Faculty: big centered heading + 3 cards ── */}
      <section id="por-que" className="section-screen py-20 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-5xl mx-auto mb-16 reveal">
            <Eyebrow>Por que entrar</Eyebrow>
            <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              O mercado está saturado de<br />cursos que ninguém termina
            </h2>
            <p className="font-body hero-banner-sub" style={{ color: 'var(--cream-soft)', margin: '0 auto', textAlign: 'center' }}>
              Vencerá quem trocar consumo por progressão real.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            {[
              {
                tag: 'Jornada',
                title: 'Saia da estante de cursos',
                desc: 'O Overpass te coloca em um caminho contínuo, começo, meio, evolução, onde cada passo abre o próximo.',
                art: (
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <linearGradient id="jLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.90 0.06 212)" />
                        <stop offset="100%" stopColor="oklch(0.66 0.10 212)" />
                      </linearGradient>
                      <linearGradient id="jDark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.54 0.09 212)" />
                        <stop offset="100%" stopColor="oklch(0.30 0.05 212)" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="100" cy="184" rx="62" ry="6" fill="#000" opacity="0.55" />
                    {/* 3D disk base — pin centralizado, waypoints partem da esquerda */}
                    <path d="M40 158 A60 16 0 0 0 160 158 L160 168 A60 16 0 0 1 40 168 Z" fill="url(#jDark)" />
                    <ellipse cx="100" cy="158" rx="60" ry="16" fill="url(#jLight)" />
                    {/* waypoints subindo até o pin centralizado */}
                    <circle cx="56"  cy="160" r="3" fill="#fff" opacity="0.35" />
                    <circle cx="74"  cy="158" r="3" fill="#fff" opacity="0.45" />
                    <circle cx="92"  cy="156" r="3.5" fill="#fff" opacity="0.6" />
                    {/* sombra do pin no topo do disco (centralizada em x=100) */}
                    <ellipse cx="100" cy="152" rx="16" ry="3.5" fill="#000" opacity="0.55" />
                    {/* 3D teardrop pin — centralizado em x=100 */}
                    <path d="M100 38 C 78 38 66 56 66 76 C 66 100 100 148 100 148 C 100 148 134 100 134 76 C 134 56 122 38 100 38 Z" fill="url(#jLight)" />
                    {/* hole no centro VISUAL do bulbo (y=66, não na linha mais larga) */}
                    <circle cx="100" cy="66" r="10" fill="#0d0d0d" opacity="0.78" />
                    {/* highlight (luz vinda do alto-esquerda) */}
                    <ellipse cx="85" cy="56" rx="6" ry="11" fill="#fff" opacity="0.34" transform="rotate(-22 85 56)" />
                    {/* cubinho flutuante isométrico (3 faces) — fora do disco, à esquerda */}
                    <g transform="translate(30 70) rotate(-10)">
                      <polygon points="0,8 12,2 24,8 12,14" fill="url(#jLight)" />
                      <polygon points="0,8 12,14 12,28 0,22" fill="url(#jDark)" />
                      <polygon points="24,8 12,14 12,28 24,22" fill="url(#jLight)" opacity="0.7" />
                    </g>
                  </svg>
                ),
              },
              {
                tag: 'Progressão',
                title: 'Onde você está chegando',
                desc: 'Ninguém evolui sem medir. No Overpass, cada avanço é reconhecido por níveis, marcos e conquistas reais.',
                art: (
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <linearGradient id="pTop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.92 0.05 212)" />
                        <stop offset="100%" stopColor="oklch(0.74 0.08 212)" />
                      </linearGradient>
                      <linearGradient id="pFront" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.78 0.08 212)" />
                        <stop offset="100%" stopColor="oklch(0.52 0.09 212)" />
                      </linearGradient>
                      <linearGradient id="pSide" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.52 0.08 212)" />
                        <stop offset="100%" stopColor="oklch(0.30 0.05 212)" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="100" cy="184" rx="64" ry="6" fill="#000" opacity="0.55" />
                    {/* Bar 1 (shortest) — isometric cube */}
                    <g opacity="0.55">
                      <polygon points="44,124 64,114 84,124 64,134" fill="url(#pTop)" />
                      <polygon points="44,124 64,134 64,172 44,162" fill="url(#pFront)" />
                      <polygon points="84,124 64,134 64,172 84,162" fill="url(#pSide)" />
                    </g>
                    {/* Bar 2 (mid) */}
                    <g opacity="0.82">
                      <polygon points="80,90 100,80 120,90 100,100" fill="url(#pTop)" />
                      <polygon points="80,90 100,100 100,172 80,162" fill="url(#pFront)" />
                      <polygon points="120,90 100,100 100,172 120,162" fill="url(#pSide)" />
                    </g>
                    {/* Bar 3 (tallest) */}
                    <g>
                      <polygon points="116,46 136,36 156,46 136,56" fill="url(#pTop)" />
                      <polygon points="116,46 136,56 136,172 116,162" fill="url(#pFront)" />
                      <polygon points="156,46 136,56 136,172 156,162" fill="url(#pSide)" />
                    </g>
                    {/* linha de tendência conecta os PICOS reais (back-vertex de cada topo) */}
                    <path d="M64 114 L 100 80 L 136 36" stroke="#fff" strokeWidth="1.2" strokeDasharray="3 4" strokeLinecap="round" opacity="0.45" fill="none" />
                    {/* marco luminoso NO PICO do bar 3 */}
                    <circle cx="136" cy="36" r="6" fill="#fff" opacity="0.9" />
                    <circle cx="136" cy="36" r="11" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
                  </svg>
                ),
              },
              {
                tag: 'Domínio',
                title: 'Troque consumo por aplicação',
                desc: 'Você não avança por presença, avança por entendimento aplicado.',
                nowrap: true,
                art: (
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <radialGradient id="dSphere" cx="0.32" cy="0.30" r="0.85">
                        <stop offset="0%" stopColor="oklch(0.94 0.04 212)" />
                        <stop offset="55%" stopColor="oklch(0.72 0.10 212)" />
                        <stop offset="100%" stopColor="oklch(0.36 0.07 212)" />
                      </radialGradient>
                      <linearGradient id="dArrow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.88 0.06 212)" />
                        <stop offset="100%" stopColor="oklch(0.52 0.10 212)" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="100" cy="182" rx="52" ry="6" fill="#000" opacity="0.55" />

                    {/* SPHERE com anéis orbitais (nucleus) */}
                    <circle cx="100" cy="104" r="58" fill="url(#dSphere)" />
                    <ellipse cx="100" cy="104" rx="58" ry="14" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.32" />
                    <ellipse cx="100" cy="104" rx="44" ry="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.22" />
                    <ellipse cx="100" cy="104" rx="28" ry="6"  fill="none" stroke="#fff" strokeWidth="0.9" opacity="0.18" />
                    <circle cx="100" cy="104" r="7" fill="#fff" opacity="0.9" />
                  </svg>
                ),
              },
            ].map((e) => (
              <div key={e.tag} className="reason-card">
                <div className="reason-card-visual">
                  <div className="reason-card-glow" />
                  <div className="reason-card-art">{e.art}</div>
                </div>
                <span className="reason-card-tag">{e.tag}</span>
                <h3 className={`reason-card-title${e.nowrap ? ' reason-card-title--nowrap' : ''}`}>{e.title}</h3>
                <p className="reason-card-desc">{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-start reveal">
            <figure className="flex gap-3 items-start" style={{ maxWidth: 420 }}>
              <span aria-hidden="true" className="font-display"
                style={{ color: 'var(--cream-mute)', fontSize: 22, lineHeight: 1, marginTop: 2 }}>
                "
              </span>
              <div>
                <blockquote
                  className="font-body italic"
                  style={{ color: 'var(--atmos)', fontSize: 15, lineHeight: 1.4, margin: 0 }}>
                  Não fiz faculdade de design, mas o que está sendo<br />entregue aqui, não vi mais em nenhum outro lugar.
                </blockquote>
                <figcaption className="font-body text-[13px] mt-2" style={{ color: 'var(--cream-soft)' }}>
                  Kalleb Henrique · Aluno Overpass
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── 05. COMO FUNCIONA ── Visual + tabs layout ── */}
      <HowItWorks />

      {/* ── 06. PARA QUEM — Faculty persona layout ── */}
      <section id="para-quem" className="section-screen py-20 px-6 md:px-14"
>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 reveal">
            <Eyebrow>Para quem é</Eyebrow>
            <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              Para quem é o Overpass?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-20 reveal-stagger max-w-6xl mx-auto">
            {personas.map((p) => (
              <div key={p.title} className="persona-line">
                <h3 className="pl-title">{p.title}</h3>
                <Separator style={{ background: 'rgba(254, 255, 245, 0.28)', height: '1.5px' }} />
                <p className="pl-desc">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 flex justify-end reveal">
            <figure className="flex gap-3 items-start" style={{ maxWidth: 420 }}>
              <span aria-hidden="true" className="font-display"
                style={{ color: 'var(--cream-mute)', fontSize: 22, lineHeight: 1, marginTop: 2 }}>
                "
              </span>
              <div>
                <blockquote
                  className="font-body italic"
                  style={{ color: 'var(--atmos)', fontSize: 15, lineHeight: 1.4, margin: 0 }}>
                  Muito interessante que o objetivo do projeto<br />tem mostrado: formar pessoas de verdade,<br />com profundidade.
                </blockquote>
                <figcaption className="font-body text-[13px] mt-2" style={{ color: 'var(--cream-soft)' }}>
                  Tiago Matias Xavier · Aluno Overpass
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── 06b. PARA QUEM NÃO ── */}
      <section id="para-quem-nao" className="section-screen py-16 px-6 md:px-14"
>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <Eyebrow>Honestidade</Eyebrow>
            <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              Mas não é para todo mundo.
            </h2>
            <p className="font-body hero-banner-sub" style={{ color: 'var(--cream-soft)', margin: '0 auto' }}>
              Se você se reconhece em algum desses pontos, o Overpass não vai te servir. E a gente prefere te dizer agora.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6 reveal-stagger">
            {[
              { title: 'Quem busca atalho', desc: 'Fórmulas prontas, hacks de IA, promessas de dinheiro fácil. Aqui o resultado depende de aplicação real, não de prompt mágico.' },
              { title: 'Quem só consome', desc: 'Quem quer apertar botão, copiar prompt e absorver conteúdo passivamente. Sem reflexão, não há nexialismo.' },
              { title: 'Quem evita pensar fundo', desc: 'Quem tem preguiça de refletir em profundidade ou espera que outros decidam pelo próprio desenvolvimento.' },
            ].map((e) => (
              <div key={e.title} className="exclusion-card">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07. O QUE O OVERPASS DESENVOLVE ── bento-grid ── */}
      <section id="desenvolve" className="section-screen py-24 px-6 md:px-14"
>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16 reveal">
            <Eyebrow>O que desenvolve</Eyebrow>
            <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              A infraestrutura cognitiva<br />pra criar com IA.
            </h2>

          </div>
          <div className="bento-atlas reveal-stagger">
            <div className="ba-card ba-card--big">
              <span className="ba-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07 4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07 4.24-4.24"/>
                </svg>
              </span>
              <h3>Autonomia criativa</h3>
              <p>Você sai da posição de quem espera referência pra encontrar a próxima ideia. O Overpass desenvolve a capacidade de partir do zero, com método, não com sorte.</p>
            </div>
            <div className="ba-card">
              <span className="ba-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor"/>
                </svg>
              </span>
              <h3>Fluência em IA aplicada</h3>
              <p>IA deixa de ser ferramenta isolada e vira parte do seu processo criativo. Você passa a operar agentes, sistemas e fluxos.</p>
            </div>
            <div className="ba-card">
              <span className="ba-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                </svg>
              </span>
              <h3>Pensamento nexialista</h3>
              <p>Design + escrita + estratégia + tecnologia. O Overpass treina esse músculo, não as caixas isoladas.</p>
            </div>
            <div className="ba-card">
              <span className="ba-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </span>
              <h3>Método próprio</h3>
              <p>Um jeito de trabalhar que se mantém quando briefing, cliente e ferramenta mudam.</p>
            </div>
            <div className="ba-card ba-card--biggest">
              <span className="ba-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </span>
              <h3>Disciplina de aplicação</h3>
              <p>Conhecimento sem aplicação é entretenimento. O sistema de desafios e marcos transforma estudo em prática verificável. Você sabe que sabe porque construiu.</p>
            </div>
          </div>
          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 reveal">
            <figure className="flex gap-3 items-start" style={{ maxWidth: 360 }}>
              <span aria-hidden="true" className="font-display"
                style={{ color: 'var(--cream-mute)', fontSize: 22, lineHeight: 1, marginTop: 2 }}>
                "
              </span>
              <div>
                <blockquote
                  className="font-body italic"
                  style={{ color: 'var(--atmos)', fontSize: 15, lineHeight: 1.4, margin: 0 }}>
                  Esta aula foi, sem dúvidas, um divisor de águas.<br />Uma releitura moderna da Alegoria da Caverna, de Platão.
                </blockquote>
                <figcaption className="font-body text-[13px] mt-2" style={{ color: 'var(--cream-soft)' }}>
                  Cys Pacheco · Aluna Overpass
                </figcaption>
              </div>
            </figure>
            <div className="flex-shrink-0">
              <ArrowPill onClick={openForm}>Entrar no Overpass</ArrowPill>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos-section" className="section-screen py-20 px-6 md:px-14"
>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <Eyebrow>O que nossos alunos dizem</Eyebrow>
            <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              O que dizem nossos alunos
            </h2>
            <p className="font-body hero-banner-sub" style={{ color: 'var(--cream-soft)', margin: '0 auto' }}>
              Depoimentos reais de alunos da plataforma
            </p>
          </div>

          <div className={`testimonial-wall-container${testimonialsExpanded ? ' is-expanded' : ''}`}>
            <div className={`testimonial-wall reveal-stagger${testimonialsExpanded ? ' is-expanded' : ''}`}>
              {testimonials.filter(t => t.group !== 'manifesto').map((t) => <TestimonialCard key={t.name + t.group} t={t} />)}
            </div>
            {!testimonialsExpanded && <div className="testimonial-wall-fade" aria-hidden="true" />}
          </div>
          <div className="testimonial-toggle-row">
            <button
              type="button"
              className="testimonial-toggle"
              onClick={() => setTestimonialsExpanded(v => !v)}
              aria-expanded={testimonialsExpanded}
            >
              {testimonialsExpanded ? 'Mostrar menos' : 'Mostrar mais'}
            </button>
          </div>

          <div className="cta-intermediate">
            <span className="cta-note">Sua história pode entrar nesta lista.</span>
            <ArrowPill onClick={openForm}>Entrar no Overpass</ArrowPill>
          </div>
        </div>
      </section>

      {/* ── 10. PRICING — Ticket Atmos ── */}
      <section id="valor" className="section-screen py-24 px-6 md:px-14"
        style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <Eyebrow>Comece sua jornada</Eyebrow>
            <h2 className="font-display" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              O melhor valor pra você
            </h2>
          </div>

          <Card className="ticket-card reveal p-0 gap-0">
            {/* perfuração + meias-luas (ticket stub) */}
            <span className="ticket-cutout ticket-cutout--top" aria-hidden />
            <span className="ticket-perf" aria-hidden />
            <span className="ticket-cutout ticket-cutout--bottom" aria-hidden />

            {/* LEFT — descrição + features + footer */}
            <CardContent className="ticket-side ticket-side--left">
              <h3 className="font-body" style={{ color: 'var(--cream)', fontSize: 'clamp(22px, 2.2vw, 28px)', lineHeight: 1.2, letterSpacing: '-0.015em', fontWeight: 500 }}>
                Plataforma de evolução criativa<br />com IA, do zero ao sistema
              </h3>
              <p className="ticket-meta">
                Online · Trilhas + Overchat + Encontros ao vivo · Preço travado pra sempre
              </p>

              <ItemGroup className="ticket-mini-grid">
                {[
                  {
                    title: 'Trilhas estruturadas',
                    sub: 'Sequência intencional, sem improviso',
                    icon: <CheckSolidIcon size="sm" width={18} height={18} />,
                  },
                  {
                    title: 'Overchat com IA',
                    sub: 'Lentes e modelos mentais aplicados',
                    icon: <CognitionLineIcon size="sm" width={18} height={18} />,
                  },
                  {
                    title: 'Encontros ao vivo',
                    sub: 'Terça 15h + replay 7 dias',
                    icon: <CalendarSolidIcon size="sm" width={18} height={18} />,
                  },
                  {
                    title: 'Sem enrolação',
                    sub: 'Você avança fazendo, não assistindo',
                    icon: <BoltSolidIcon size="sm" width={18} height={18} />,
                  },
                ].map((f) => (
                  <Item key={f.title} variant="outline" className="ticket-mini">
                    <ItemMedia variant="icon" className="ticket-mini-icon">{f.icon}</ItemMedia>
                    <ItemContent>
                      <ItemTitle className="ticket-mini-title">{f.title}</ItemTitle>
                      <ItemDescription className="ticket-mini-sub">{f.sub}</ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </ItemGroup>

              <Separator className="ticket-foot-sep" />
              <div className="ticket-foot">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>Formas de pagamento:</span>
                  {['Pix', 'Boleto', 'Cartão'].map(m => (
                    <Badge key={m} variant="outline" className="ticket-pay-pill">{m}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="ticket-foot-icon">
                    <ShieldSolidIcon size="sm" width={14} height={14} />
                    Compra segura
                  </span>
                  <span className="ticket-foot-icon">
                    <LockSolidIcon size="sm" width={14} height={14} />
                    SSL 256-bit
                  </span>
                  <span className="ticket-foot-icon">
                    <ReturnSolidIcon size="sm" width={14} height={14} />
                    Garantia de 7 dias
                  </span>
                </div>
              </div>
            </CardContent>

            {/* RIGHT — brand + preço + lote (centralizado) */}
            <CardContent className="ticket-side ticket-side--right ticket-side--center">
              <div className="ticket-brand">
                <img src="/overlens-white.png" alt="Overlens" style={{ height: 16, width: 'auto', display: 'block' }} />
              </div>

              <div className="ticket-price-block">
                <p className="atmos-from">
                  <span className="strike">De R$2.300</span> POR:
                </p>

                <div className="atmos-price-wrap">
                  <span className="atmos-price-currency">R$</span>
                  <span className="atmos-price-integer">1.800</span>
                  <sup className="atmos-price-cents">,00</sup>
                </div>

                <p className="font-body text-[13px] mt-2" style={{ color: 'var(--cream-soft)' }}>
                  ou <strong style={{ color: 'var(--cream)' }}>12× de R$180</strong> sem juros
                </p>
              </div>

              <div className="ticket-cta">
                <ArrowPill onClick={openForm} fullWidth>Fazer aplicação</ArrowPill>
              </div>
            </CardContent>
          </Card>

          <p className="text-center font-body text-[12px] mt-8 max-w-2xl mx-auto" style={{ color: 'var(--cream-mute)' }}>
            <strong style={{ color: 'var(--cream-soft)' }}>Não prometemos resultado financeiro.</strong> Prometemos a estrutura para você construir o seu.
          </p>
          <div className="mt-16 flex justify-end reveal">
            <figure className="flex gap-3 items-start" style={{ maxWidth: 420 }}>
              <span aria-hidden="true" className="font-display"
                style={{ color: 'var(--cream-mute)', fontSize: 22, lineHeight: 1, marginTop: 2 }}>
                "
              </span>
              <div>
                <blockquote
                  className="font-body italic"
                  style={{ color: 'var(--atmos)', fontSize: 15, lineHeight: 1.4, margin: 0 }}>
                  Nunca vi um curso tão profundo.<br />Isso me faz ter orgulho de cada<br />centavo investido nessa plataforma.
                </blockquote>
                <figcaption className="font-body text-[13px] mt-2" style={{ color: 'var(--cream-soft)' }}>
                  Lívia Alves Fernandes · Aluna Overpass
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── 11. RUAN BRAZ — Faculty: instructor portrait + text ── */}
      <section id="quem-ensina" className="section-screen py-20 px-6 md:px-14"
>
        <div className="max-w-6xl mx-auto instructor-grid">
          <div className="instructor-portrait reveal-left">
            <img
              src="/ruan-time-to-build.webp"
              alt="Ruan Braz : fundador da Overlens"
              className="pi-image"
              loading="lazy"
            />
          </div>
          <div className="reveal-right">
            <Eyebrow>Sobre o condutor</Eyebrow>
            <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              Ruan Braz
            </h2>
            <p className="font-body text-[15px] mt-6 leading-relaxed" style={{ color: 'var(--cream-soft)' }}>
              Fundador da Overlens e condutor principal do Overpass. Trabalha com criação, tecnologia e educação há mais de 12 anos. Já formou milhares de criadores em imersões ao vivo e defende que o futuro sempre foi feito por quem constrói, não por quem assiste.
            </p>
            <p className="font-body text-[15px] mt-4 leading-relaxed" style={{ color: 'var(--cream-soft)' }}>
              No Overpass, Ruan organiza a infraestrutura de evolução que ele mesmo gostaria de ter tido: trilhas com sequência, desafios com aplicação, marcos com sentido. Não é um catálogo de cursos. É o sistema que conduz quem leva a sério.
            </p>
            <figure className="flex gap-3 items-start mt-8" style={{ maxWidth: 420 }}>
              <span aria-hidden="true" className="font-display"
                style={{ color: 'var(--cream-mute)', fontSize: 22, lineHeight: 1, marginTop: 2 }}>
                "
              </span>
              <div>
                <blockquote
                  className="font-body italic"
                  style={{ color: 'var(--atmos)', fontSize: 15, lineHeight: 1.4, margin: 0 }}>
                  Eu amo a didática do Ruan, ele<br />me ajuda a pensar e a raciocinar.
                </blockquote>
                <figcaption className="font-body text-[13px] mt-2" style={{ color: 'var(--cream-soft)' }}>
                  Andressa Alves
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── 12. FAQ — Layout 2 colunas: âncora + lista ── */}
      <section className="section-screen py-20 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Coluna esquerda — âncora */}
            <div className="md:col-span-5 reveal">
              <div className="md:sticky md:top-24">
                <h2 className="font-display mb-5"
                  style={{
                    color: 'var(--cream)',
                    fontSize: 'clamp(32px, 3.6vw, 52px)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}>
                  Perguntas<br />frequentes
                </h2>
                <p className="font-body text-[15px] mb-8 leading-relaxed" style={{ color: 'var(--cream-soft)', maxWidth: 360 }}>
                  Tudo que você precisa saber<br />antes de garantir sua entrada.
                </p>
                <Button asChild variant="outline" size="lg" className="mb-10">
                  <a href="#" className="inline-flex items-center gap-3">
                    <WhatsAppIcon size={18} />
                    <span>Envie uma mensagem</span>
                  </a>
                </Button>
                <figure className="flex gap-3 items-start" style={{ maxWidth: 360 }}>
                  <span aria-hidden="true" className="font-display"
                    style={{ color: 'var(--cream-mute)', fontSize: 22, lineHeight: 1, marginTop: 2 }}>
                    "
                  </span>
                  <div>
                    <blockquote
                      className="font-body italic"
                      style={{ color: 'var(--atmos)', fontSize: 15, lineHeight: 1.4, margin: 0 }}>
                      O curso é tão completo que aborda até<br />as suas crenças, e isso é fundamental.
                    </blockquote>
                    <figcaption className="font-body text-[13px] mt-2" style={{ color: 'var(--cream-soft)' }}>
                      Ramon Rodrigues Marques · Aluno Overpass
                    </figcaption>
                  </div>
                </figure>
              </div>
            </div>

            {/* Coluna direita — lista de perguntas */}
            <div className="md:col-span-7 reveal">
              <Accordion type="single" collapsible defaultValue="item-0"
                className="flex flex-col gap-3">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}
                    className="rounded-2xl px-6"
                    style={{ background: 'var(--surface)', border: '1px solid var(--line)', overflow: 'hidden' }}>
                    <AccordionTrigger
                      className="text-[15px] text-left py-5"
                      style={{ color: 'var(--cream)', fontFamily: 'Inter, sans-serif', fontWeight: 400, letterSpacing: '-0.005em', textDecoration: 'none', textTransform: 'none' }}>
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="font-body text-[14px] leading-relaxed pb-5"
                      style={{ color: 'var(--cream-soft)' }}>
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. CTA FINAL — Faculty bigcta-card ── */}
      <section id="contato" className="py-24 px-6 md:px-14">
        <div className="mx-auto reveal" style={{ maxWidth: '1480px' }}>
          <div
            className="bigcta-card"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, oklch(0.779 0.08 212.242 / 0.22) 0%, transparent 60%), linear-gradient(180deg, oklch(0.28 0.06 212.242) 0%, oklch(0.18 0.045 212.242) 100%)',
              borderColor: 'var(--atmos-line)',
            }}
          >
            <Eyebrow>Sua entrada</Eyebrow>
            <h2 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 4.2vw, 60px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
              Pronto para parar de<br />acumular cursos?
            </h2>
            <p className="font-body text-[16px] mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--cream-soft)' }}>
              A era de consumir conteúdo passivamente acabou. A era de construir, medir e aplicar começou. Entre na infraestrutura de evolução criativa de quem leva a sério.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <ArrowPill onClick={openForm}>Entrar no Overpass</ArrowPill>
              <ArrowPill href="#" dark>Falar no WhatsApp</ArrowPill>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 md:px-14" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <img src="/overlens-white.png" alt="Overlens" style={{ height: 20, width: 'auto', display: 'block', marginBottom: 16 }} />
              <p className="font-body text-[12px] leading-relaxed" style={{ color: 'var(--cream-mute)' }}>
                Plataforma de evolução criativa da Overlens. Para quem aprendeu que criar é mais que executar.
              </p>
            </div>
            <div>
              <p className="font-eyebrow text-[11px] mb-4" style={{ color: 'var(--cream-mute)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Plataforma</p>
              <ul className="flex flex-col gap-2 font-body text-[13px]" style={{ color: 'var(--cream-soft)' }}>
                {[['#como-funciona', 'Como funciona'], ['#desenvolve', 'O que desenvolve'], ['#para-quem', 'Para quem é'], ['#valor', 'Lote Founders']].map(([href, label]) => (
                  <li key={href}><a href={href} style={{ color: 'inherit' }}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-eyebrow text-[11px] mb-4" style={{ color: 'var(--cream-mute)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Comunidade</p>
              <ul className="flex flex-col gap-2 font-body text-[13px]" style={{ color: 'var(--cream-soft)' }}>
                {[['#quem-ensina', 'Quem conduz'], ['#depoimentos-section', 'Depoimentos'], ['#', 'WhatsApp'], ['#', 'Newsletter']].map(([href, label]) => (
                  <li key={label}><a href={href} style={{ color: 'inherit' }}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-eyebrow text-[11px] mb-4" style={{ color: 'var(--cream-mute)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Sobre</p>
              <ul className="flex flex-col gap-2 font-body text-[13px]" style={{ color: 'var(--cream-soft)' }}>
                {[['#', 'Overlens'], ['#manifesto', 'Manifesto'], ['#', 'FAQ'], ['#contato', 'Contato']].map(([href, label]) => (
                  <li key={label}><a href={href} style={{ color: 'inherit' }}>{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <Separator style={{ background: 'var(--line)', marginBottom: 32 }} />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-body text-[11px]" style={{ color: 'var(--cream-mute)' }}>Overlens © 2026 · Time to Build</p>
            <p className="font-eyebrow text-[10px]" style={{ color: 'var(--cream-mute)', letterSpacing: '0.18em' }}>MADE WITH INTENTION</p>
          </div>
        </div>
      </footer>

      {/* ── STICKY CTA BAR — fixed bottom ── */}
      <div className="sticky-cta">
        <span className="font-body text-[13px]" style={{ color: 'var(--cream)' }}>
          <span style={{ color: 'var(--cream-mute)', textDecoration: 'line-through', marginRight: 6 }}>R$2.300</span>
          R$1.800 <span style={{ color: 'var(--cream-mute)' }}>ou 12× de R$180</span>
        </span>
        <Button variant="default" size="sm" onClick={openForm}>
          Fazer aplicação <ArrowRight size={12} />
        </Button>
      </div>

      {/* ── FLOATING BUTTONS (voltar ao topo + WhatsApp) ── */}
      <div style={{ position: 'fixed', bottom: 20, right: 12, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 50 }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
          style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--surface-2)', border: '1px solid var(--line-strong)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', transition: 'transform 0.2s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button
          onClick={() => window.open('https://wa.me/', '_blank')}
          aria-label="Falar no WhatsApp"
          style={{ width: 56, height: 56, borderRadius: '50%', background: '#25D366', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', transition: 'transform 0.2s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <WhatsAppIcon size={26} />
        </button>
      </div>

      {showForm && <ApplicationModal onClose={() => setShowForm(false)} />}

    </div>
  )
}
