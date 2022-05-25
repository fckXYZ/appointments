import p2pCover from '../assets/images/p2p/cover.webp';
import p2pMain from '../assets/images/p2p/main.webp';
import p2pBlog from '../assets/images/p2p/blog.webp';
import p2pWp from '../assets/images/p2p/wp.webp';

import schoolCover from '../assets/images/school/cover.webp';
import schoolMainDark from '../assets/images/school/main_dark.webp';
import schoolMainLight from '../assets/images/school/main_light.webp';
import schoolProfileDark from '../assets/images/school/profile_dark.webp';
import schoolProfileLight from '../assets/images/school/profile_light.webp';
import schoolPurchase from '../assets/images/school/purchase.webp';

import drakonCover from '../assets/images/drakon/cover.webp';
import drakonMain from '../assets/images/drakon/main.webp';
import drakonMusic from '../assets/images/drakon/music.webp';
import drakonPhoto from '../assets/images/drakon/photo.webp';

export const MY_LIST = [
	{
		id: '1',
		name: 'Solid P2P',
		cover: p2pCover,
		imgs: [p2pWp, p2pMain, p2pBlog],
		description: "Лэндинг для P2P обменника.",
		perks: [
			'Динамически рисующиеся в реальном времени курсы валют на анимированной карусели вверху гланой страницы',
			"Виджет с расчетом курса обмена интересующей валюты и перебросом на страницу обменника в интересующую валютную пару",
			"Админпанель",
			"Возможность полного ребрендинга через админку: название, логотип, контактные данные, почта, адрес, все комиссии на ввод/вывод средств редактируемые",
			"Возможность добавлять статьи в блог на 2 языках",
			"Редактируемый мультиязычный FAQ"
		],
		stack: [
			'React 17',
			'Redux',
			'Redux-Saga',
			'AdminBro',
			'NodeJS(express)',
			'MongoDB'
		],
		link: 'https://solidp2p.io'
	},
	{
		id: '2',
		name: 'Sirius trading school',
		cover: schoolCover,
		imgs: [schoolMainDark, schoolMainLight, schoolProfileDark, schoolProfileLight, schoolPurchase],
		description: "Образовательныя платформа",
		perks: [
			'Две цветовые схемы',
			'Регистрация/Авторизация пользователя',
			'Админпанель',
			'Возможность добавления уроков/видео в курсы на 3 языках, как через админпанель, так и через фронт для админов',
			'Механизм покупки курса',
			'Управление через админпанель: активность платежных систем, активность отдельных кошельков в рамках платежных систем, цены курсов',
			'Механзм оценки уроков пользователем, трекинг пройденных уроков'
		],
		stack: [
			'React 17',
			'Redux',
			'Redux-Saga',
			'Strapi CMS',
			'NodeJS(koa)',
			'PostgreSQL'
		],
		link: 'https://siriustrading.courses'
	},
	{
		id: '3',
		name: 'Drakon.Band',
		cover: drakonCover,
		imgs: [drakonMain, drakonMusic, drakonPhoto],
		description: "Образовательныя платформа",
		perks: [
			'Админпанель',
			'Возможность добавления аудио/альбомов/фото/видео/статей , через админпанель',
			'Аудиоплеер',
			"Редактирование всех контактных данных/ссылок на соц.сети в админке"
		],
		stack: [
			'React 17',
			'Redux',
			'Redux-Saga',
			'AdminBro',
			'NodeJS(express)',
			'MongoDB'
		],
		link: 'https://drakon.band'
	}
]
