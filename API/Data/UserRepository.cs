using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public Task<MemberDto> GetMemberByUsernameAsync(string username)
        {
            // * Get the user by username
            return _context.AppUsers
                .Where(appUser => appUser.UserName == username)
                // * Project the AppUser to a MemberDto
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            // * Get the users
            var members = await _context.AppUsers
                // * Project the AppUser to a MemberDto
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return members.AsEnumerable();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.AppUsers.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            // * Include the Photos property of the AppUser by using the Include() method
            return await _context.AppUsers
                .Include(appUser => appUser.Photos)
                .SingleOrDefaultAsync(appUser => appUser.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.AppUsers.Include(appUser => appUser.Photos).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
