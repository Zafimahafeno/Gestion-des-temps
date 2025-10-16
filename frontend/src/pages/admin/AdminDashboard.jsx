import React, { useState } from 'react';
import { Home, Folder, Users, Settings, LogIn, Bell, Edit, Trash2, PlusCircle, CheckSquare } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css'; // Assure-toi que ton CSS est bien importé

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const [projects, setProjects] = useState([
    { id: 1, name: 'Projet Alpha', description: 'Description du projet Alpha' },
    { id: 2, name: 'Projet Beta', description: 'Description du projet Beta' },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tâche 1', project: 'Projet Alpha', status: 'En cours' },
    { id: 2, title: 'Tâche 2', project: 'Projet Beta', status: 'Terminé' },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nouvel utilisateur inscrit', time: '10:15 AM' },
    { id: 2, message: 'Projet Beta mis à jour', time: '09:45 AM' },
  ]);
  const [settings, setSettings] = useState({ siteName: 'Mon Admin', theme: 'Clair' });

  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [userForm, setUserForm] = useState({ name: '', email: '' });
  const [taskForm, setTaskForm] = useState({ title: '', project: '', status: '' });

  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="admin-content">
            <h2 className="text-light fs-2 fw-bold mb-4">Tableau de Bord</h2>
            <div className="row g-4">
              <AdminCard title="Projets" count={projects.length} color="primary" icon={<Folder size={24} />} details="Projets en cours" />
              <AdminCard title="Utilisateurs" count={users.length} color="success" icon={<Users size={24} />} details="Utilisateurs enregistrés" />
              <AdminCard title="Tâches" count={tasks.length} color="info" icon={<CheckSquare size={24} />} details="Tâches en cours" />
              <AdminCard title="Notifications" count={notifications.length} color="warning" icon={<Bell size={24} />} details="Notifications récentes" />
            </div>
          </div>
        );
      case 'projects':
        return <CardGrid title="Projets" items={projects} fields={['name', 'description']} setItems={setProjects} form={projectForm} setForm={setProjectForm} />;
      case 'users':
        return <CardGrid title="Utilisateurs" items={users} fields={['name', 'email']} setItems={setUsers} form={userForm} setForm={setUserForm} />;
      case 'tasks':
        return <CardGrid title="Tâches" items={tasks} fields={['title', 'project', 'status']} setItems={setTasks} form={taskForm} setForm={setTaskForm} />;
      case 'settings':
        return (
          <div className="admin-content">
            <h2 className="text-light fs-3 fw-bold mb-3">Paramètres</h2>
            <div className="p-4 rounded bg-dark bg-opacity-25">
              <div className="mb-3">
                <label className="form-label text-light">Nom du site</label>
                <input className="form-control bg-dark text-light border-0" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">Thème</label>
                <select className="form-select bg-dark text-light border-0" value={settings.theme} onChange={(e) => setSettings({ ...settings, theme: e.target.value })}>
                  <option>Clair</option>
                  <option>Sombre</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={() => alert('Paramètres sauvegardés !')}>Enregistrer</button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="admin-content">
            <h2 className="text-light fs-3 fw-bold mb-3">Notifications</h2>
            <div className="d-flex flex-column gap-3">
              {notifications.map(n => (
                <div key={n.id} className="p-3 rounded bg-dark bg-opacity-25 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1 text-light">{n.message}</p>
                    <small className="text-secondary">{n.time}</small>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-success" onClick={() => alert('Marquée comme lue !')}>✔</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setNotifications(notifications.filter(x => x.id !== n.id))}>✖</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <PageWrapper title="Connexion" text="Se connecter au panneau d’administration." />;
    }
  };

  const navItemClass = (page) => `admin-nav-btn ${activePage === page ? 'is-active text-light' : 'text-secondary'}`;

  return (
    <div className="d-flex flex-column flex-md-row h-100 admin-root">
      {/* Sidebar */}
      <aside className="admin-sidebar d-flex flex-column justify-content-between p-4">
        <div>
          <div className="d-flex align-items-center mb-5 fs-4 fw-bold text-light"><Home size={26} className="me-2" /> Admin Panel</div>
          <div className="admin-nav d-flex flex-column gap-2">
            <button onClick={() => setActivePage('dashboard')} className={navItemClass('dashboard')}><Home size={20}/> Tableau de Bord</button>
            <button onClick={() => setActivePage('projects')} className={navItemClass('projects')}><Folder size={20}/> Projets</button>
            <button onClick={() => setActivePage('users')} className={navItemClass('users')}><Users size={20}/> Utilisateurs</button>
            <button onClick={() => setActivePage('tasks')} className={navItemClass('tasks')}><CheckSquare size={20}/> Tâches</button>
            <button onClick={() => setActivePage('settings')} className={navItemClass('settings')}><Settings size={20}/> Paramètres</button>
            <button onClick={() => setActivePage('notifications')} className={navItemClass('notifications')}><Bell size={20}/> Notifications</button>
          </div>
        </div>
        <button onClick={() => setActivePage('login')} className="btn btn-outline-light mt-4"><LogIn size={18}/> Se connecter</button>
      </aside>

      {/* Main */}
      <main className="flex-grow-1 d-flex flex-column" style={{ background: 'linear-gradient(180deg, #111827, #0f172a)', minHeight: '100vh',width: '1200px' }}>
        <header className="admin-header d-flex justify-content-between align-items-center p-3">
          <h1 className="text-light fs-5 fw-bold m-0">Bienvenue, Administrateur</h1>
          <div className="d-flex align-items-center">
            <span className="text-light me-3 d-none d-sm-inline">admin@example.com</span>
            <div className="avatar rounded-circle d-flex justify-content-center align-items-center text-light" style={{ width: '36px', height: '36px' }}>A</div>
          </div>
        </header>
        <div className="flex-grow-1 overflow-auto">
          <div className="p-4">
            {renderPageContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Composants enfants ---
const AdminCard = ({ title, count, color, icon, details }) => (
  <div className="col-md-3">
    <div className="admin-card p-4 h-100 text-light">
      <div className="d-flex align-items-center mb-2">{icon}<h3 className="fs-6 fw-bold ms-2">{title}</h3></div>
      <p className={`fs-2 fw-bold text-${color}`}>{count}</p>
      <p className="text-secondary small">{details}</p>
    </div>
  </div>
);

const CardGrid = ({ title, items, fields, setItems, form, setForm }) => (
  <div className="admin-content">
    <h2 className="text-light fs-3 fw-bold mb-4">{title}</h2>
    <div className="p-3 rounded bg-dark bg-opacity-25 d-flex flex-wrap gap-2 mb-4">
      {fields.map(f => (
        <input key={f} type={f === 'email' ? 'email' : 'text'} placeholder={f} className="form-control bg-dark text-light border-0" value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button className="btn btn-primary" onClick={() => {
        if (fields.every(f => form[f])) {
          setItems([...items, { id: Date.now(), ...form }]);
          setForm(fields.reduce((a, f) => ({ ...a, [f]: '' }), {}));
        }
      }}>Ajouter <PlusCircle size={16}/></button>
    </div>
    <div className="row g-4">
      {items.map(item => (
        <div key={item.id} className="col-md-4">
          <div className="admin-card p-4 text-light">
            {fields.map(f => <p key={f}><strong>{f}:</strong> {item[f]}</p>)}
            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-sm btn-warning" onClick={() => {
                const updated = { ...item };
                fields.forEach(f => {
                  const val = prompt(`Modifier ${f}`, item[f]);
                  if (val) updated[f] = val;
                });
                setItems(items.map(it => it.id === item.id ? updated : it));
              }}><Edit size={16}/></button>
              <button className="btn btn-sm btn-danger" onClick={() => setItems(items.filter(it => it.id !== item.id))}><Trash2 size={16}/></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PageWrapper = ({ title, text }) => (
  <div className="admin-content text-light">
    <h2 className="fw-bold mb-3">{title}</h2>
    <p>{text}</p>
  </div>
);

export default App;
